using AutoMapper;
using Ordering.Application.Orders.Commands.CheckoutOrder;
using Ordering.Application.Orders.Commands.UpdateOrder;
using Ordering.Application.Orders.Queries.GetOrdersList;
using Ordering.Domain.Entities;

namespace Ordering.Application.Common.Mappings
{
    public class MappingProfile : Profile

    {
        public MappingProfile()
        {
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<CheckoutOrderCommand, Order>();
            CreateMap<UpdateOrderCommand, Order>().ReverseMap();
        }
    }
}
