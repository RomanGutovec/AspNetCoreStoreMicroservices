using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Ordering.Application.Common.Interfaces;

namespace Ordering.Application.Orders.Queries.GetOrdersList
{
    public class GetOrdersListQueryHandler : IRequestHandler<GetOrdersListQuery, OrdersListVm>
    {
        private readonly IMapper mapper;
        private readonly IOrderingDbContext dbContext;

        public GetOrdersListQueryHandler(IMapper mapper, IOrderingDbContext dbContext)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<OrdersListVm> Handle(GetOrdersListQuery request, CancellationToken cancellationToken)
        {
            var orders = await dbContext.Orders.Where(x => x.UserName == request.UserName).ProjectTo<OrderDto>(mapper.ConfigurationProvider).ToListAsync(cancellationToken);
            return new OrdersListVm { OrdersList = orders };
        }
    }
}
