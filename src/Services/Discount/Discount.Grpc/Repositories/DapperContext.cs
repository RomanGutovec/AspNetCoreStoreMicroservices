using Microsoft.Extensions.Configuration;
using Npgsql;

namespace Discount.Grpc.Repositories
{
    public class DapperContext
    {
        private readonly string connectionString;

        public DapperContext(IConfiguration configuration)
        {
            connectionString = configuration.GetValue<string>("DatabaseSettings:ConnectionString");
        }

        public NpgsqlConnection CreateConnection()
            => new NpgsqlConnection(connectionString);
    }
}
