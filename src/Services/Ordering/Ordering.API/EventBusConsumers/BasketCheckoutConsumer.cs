using System;
using System.Threading.Tasks;
using AutoMapper;
using EventBus.Messages.Events;
using MassTransit;
using MediatR;
using Microsoft.Extensions.Logging;
using Ordering.Application.Orders.Commands.CheckoutOrder;

namespace Ordering.API.EventBusConsumers
{
    public class BasketCheckoutConsumer : IConsumer<BasketCheckoutEvent>
    {
        private readonly IMapper mapper;
        private readonly IMediator mediator;
        private readonly ILogger<BasketCheckoutConsumer> logger;

        public BasketCheckoutConsumer(IMapper mapper, IMediator mediator, ILogger<BasketCheckoutConsumer> logger)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
        public async Task Consume(ConsumeContext<BasketCheckoutEvent> context)
        {
            logger.LogInformation($"Start processing message with Id:{context.MessageId}");
            var order = mapper.Map<CheckoutOrderCommand>(context.Message);
            var orderId = await mediator.Send(order);
            logger.LogInformation($"Order with id:{orderId} is successfully created.");
        }
    }
}
