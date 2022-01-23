using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ordering.Application.Common.Interfaces;
using Ordering.Application.Notifications.Models;
using Ordering.Infrastructure.Persistence;

namespace Ordering.Infrastructure
{

    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services,
            IConfiguration configuration)
        {

            services.AddDbContext<OrderingDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("OrderingConnectionString")));
            services.AddScoped<IOrderingDbContext>(provider => provider.GetService<OrderingDbContext>());

            services.AddOptions();
            services.Configure<NotificationConfiguration>(configuration.GetSection("NotificationConfiguration"));
            services.AddTransient<IDateTime, DateTimeMachine>();
            services.AddTransient<INotificationService, NotificationService>();
            return services;
        }
    }
}
