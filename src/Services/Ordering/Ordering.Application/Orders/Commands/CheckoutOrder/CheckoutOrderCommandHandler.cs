using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Ordering.Application.Common.Interfaces;
using Ordering.Application.Notifications.Exceptions;
using Ordering.Application.Notifications.Models;
using Ordering.Domain.Entities;

namespace Ordering.Application.Orders.Commands.CheckoutOrder
{
    public class CheckoutOrderCommandHandler : IRequestHandler<CheckoutOrderCommand, int>
    {
        private readonly IMapper mapper;
        private readonly IOrderingDbContext dbContext;
        private readonly INotificationService notificationService;
        private readonly ILogger<CheckoutOrderCommandHandler> logger;

        public CheckoutOrderCommandHandler(IMapper mapper, IOrderingDbContext dbContext, INotificationService notificationService, ILogger<CheckoutOrderCommandHandler> logger)
        {
            this.mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            this.notificationService = notificationService ?? throw new ArgumentNullException(nameof(notificationService));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<int> Handle(CheckoutOrderCommand request, CancellationToken cancellationToken)
        {
            var entity = mapper.Map<Order>(request);

            dbContext.Orders.Add(entity);
            await dbContext.SaveChangesAsync(cancellationToken);

            try
            {
                await notificationService.SendAsync(new MessageDto());
            }
            catch (NotificationServiceException)
            {
                logger.LogError("Message was not sent.");
            }

            return entity.Id;
        }
    }
}
