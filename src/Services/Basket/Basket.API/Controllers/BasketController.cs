using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Basket.API.Entities;
using Basket.API.GrpcServices;
using Basket.API.Repositories.Interfaces;
using EventBus.Messages.Events;
using MassTransit;
using Microsoft.AspNetCore.Http;

namespace Basket.API.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly IBasketRepository basketRepository;
        private readonly DiscountGrpcService discountGrpcService;
        private readonly IMapper mapper;
        private readonly IPublishEndpoint publishEndpoint;

        public BasketController(IBasketRepository basketRepository, DiscountGrpcService discountGrpcService,
            IMapper mapper, IPublishEndpoint publishEndpoint)
        {
            this.basketRepository = basketRepository ?? throw new ArgumentNullException(nameof(basketRepository));
            this.discountGrpcService =
                discountGrpcService ?? throw new ArgumentNullException(nameof(discountGrpcService));
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.publishEndpoint = publishEndpoint ?? throw new ArgumentNullException(nameof(publishEndpoint));
        }

        [HttpGet("{userName}", Name = "GetBasket")]
        [ProducesResponseType(typeof(ShoppingCart), StatusCodes.Status200OK)]
        public async Task<ActionResult<ShoppingCart>> GetBasket(string userName)
        {
            var basket = await basketRepository.GetBasketAsync(userName);
            return Ok(basket ?? new ShoppingCart(userName));
        }

        [Route("[action]")]
        [HttpPost(Name = "CreateBasket")]
        [ProducesResponseType(typeof(ShoppingCart), StatusCodes.Status200OK)]
        public async Task<ActionResult<ShoppingCart>> Create([FromBody] ShoppingCart basket)
        {
            var coupons = basket.Items.Select(async i =>
            {
                var coupon = await discountGrpcService.GetDiscount(i.ProductName);
                i.Price -= coupon.Amount;
            });

            Task.WaitAll(coupons.ToArray());
            return Ok(await basketRepository.UpdateBasketAsync(basket));
        }

        [HttpPut(Name = "UpdateBasket")]
        [ProducesResponseType(typeof(ShoppingCart), StatusCodes.Status200OK)]
        public async Task<ActionResult<ShoppingCart>> UpdateBasket([FromBody] ShoppingCart basket)
        {
            var originalBasket = await basketRepository.GetBasketAsync(basket.UserName);
            if (originalBasket is null) return BadRequest();

            originalBasket.Items.ForEach(i =>
            {
                var matchedItem = basket.Items.FirstOrDefault(bi => bi.ProductId == i.ProductId);
                if (matchedItem != null)
                {
                    i.Quantity = matchedItem.Quantity;
                }
            });
            
            return Ok(await basketRepository.UpdateBasketAsync(basket));
        }


        [HttpDelete("{userName}", Name = "DeleteBasket")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        public async Task<ActionResult> DeleteBasket(string userName)
        {
            await basketRepository.DeleteBasketAsync(userName);
            return Ok();
        }

        [Route("[action]")]
        [HttpPost("Checkout")]
        [ProducesResponseType(typeof(void), StatusCodes.Status202Accepted)]
        [ProducesResponseType(typeof(void), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Checkout([FromBody] BasketCheckout basketCheckout)
        {
            var basket = await basketRepository.GetBasketAsync(basketCheckout.UserName);
            if (basket is null) return BadRequest();

            await basketRepository.DeleteBasketAsync(basketCheckout.UserName);

            var eventMessage = mapper.Map<BasketCheckoutEvent>(basketCheckout);
            eventMessage.TotalPrice = basket.TotalPrice;
            await publishEndpoint.Publish(eventMessage);
            return Accepted();
        }
    }
}