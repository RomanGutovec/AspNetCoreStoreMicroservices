using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Ordering.Domain.Entities;

namespace Ordering.Infrastructure.Persistence
{
    public class OrderContextSeeder
    {
        public static async Task SeedAsync(OrderingDbContext orderingDbContext, ILogger<OrderContextSeeder> logger)
            {
                if (!orderingDbContext.Orders.Any())
                {
                    orderingDbContext.Orders.AddRange(GetPreconfiguredOrders());
                    await orderingDbContext.SaveChangesAsync();
                    logger.LogInformation("Seed database associated with context {DbContextName}", nameof(OrderingDbContext));
                }
            }

            private static IEnumerable<Order> GetPreconfiguredOrders()
            {
                return new List<Order>
                {
                    new()
                    {
                        UserName = "swn", FirstName = "Olaya", LastName = "Pipper", EmailAddress = "olaya_pipper@gmail.com",
                        AddressLine = "Trafalgar Square", Country = "GB", TotalPrice = 350
                    },
                };
            }
        
    }
}
