using System;
using MediatR;

namespace Ordering.Application.Orders.Queries.GetOrdersList
{
    public class GetOrdersListQuery : IRequest<OrdersListVm>
    {
        public string UserName { get; }

        public GetOrdersListQuery(string userName)
        {
            UserName = userName ?? throw new ArgumentNullException(nameof(userName));
        }
    }
}
