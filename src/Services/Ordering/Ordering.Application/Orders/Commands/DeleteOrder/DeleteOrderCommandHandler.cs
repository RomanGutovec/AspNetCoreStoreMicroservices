using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Ordering.Application.Common.Exceptions;
using Ordering.Application.Common.Interfaces;
using Ordering.Domain.Entities;

namespace Ordering.Application.Orders.Commands.DeleteOrder
{
    public class DeleteOrderCommandHandler : IRequestHandler<DeleteOrderCommand>
    {
        private readonly IOrderingDbContext dbContext;

        public DeleteOrderCommandHandler(IOrderingDbContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }
        public async Task<Unit> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
        {
            var entity = await dbContext.Orders
                .FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Order), request.Id);
            }

            dbContext.Orders.Remove(entity);

            await dbContext.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
