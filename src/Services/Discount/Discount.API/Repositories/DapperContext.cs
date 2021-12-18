using System;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace Discount.API.Repositories
{
    public class DapperContext
    {
        private readonly IConfiguration configuration;
        private readonly string connectionString;

        public DapperContext(IConfiguration configuration)
        {
            this.configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            connectionString = this.configuration.GetValue<string>("DatabaseSettings:ConnectionString");
        }

        public NpgsqlConnection CreateConnection()
            => new NpgsqlConnection(connectionString);
    }
}
