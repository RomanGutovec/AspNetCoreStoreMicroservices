using System;
using System.Threading;
using Discount.Grpc.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Npgsql;

namespace Discount.Grpc.Extensions
{
    public static class HostExtensions
    {
        private const string CouponTableName = "coupon";

        public static IHost MigrateDatabase<TContext>(this IHost host, int? retry = 0)
        {
            var retryForAvailability = retry.Value;

            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;
            var configuration = services.GetRequiredService<IConfiguration>();
            var logger = services.GetRequiredService<ILogger<TContext>>();
            var dapperContext = services.GetRequiredService<DapperContext>();

            try
            {
                logger.LogInformation("Migrating postgresql database.");

                using var discountDbConnection = dapperContext.CreateConnection();
                using var postgresConnection = new NpgsqlConnection(configuration.GetValue<string>("DatabaseSettings:ConnectionStringMigration"));
                postgresConnection.Open();

                CreateDiscountDb(postgresConnection, discountDbConnection.Database);
                postgresConnection.Close();

                discountDbConnection.Open();

                if (IsCouponTableExists(discountDbConnection))
                {
                    return host;
                }

                CreateCouponTable(discountDbConnection);
                SeedCouponData(discountDbConnection);
                discountDbConnection.Close();
            }
            catch (NpgsqlException exception)
            {
                logger.LogError($"Migrating failed with error: ex: {exception.Message}");

                //TODO Polly
                if (retryForAvailability < 50)
                {
                    Thread.Sleep(5000);
                    MigrateDatabase<TContext>(host, ++retryForAvailability);
                }
            }
            catch (Exception exception)
            {
                logger.LogError($"Migrating failed with error: ex: {exception.Message}");
                throw;
            }

            return host;
        }

        private static bool IsDiscountDbExists(NpgsqlConnection connection, string dbName)
        {
            var commandText = $"select exists(SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('{dbName}'));";
            using var cmd = new NpgsqlCommand(commandText, connection);
            return (bool)cmd.ExecuteScalar();
        }

        private static bool IsCouponTableExists(NpgsqlConnection connection)
        {
            var commandText = $"select exists(SELECT table_name FROM information_schema.tables WHERE table_schema = current_schema() AND table_name = '{CouponTableName}');";
            using var cmd = new NpgsqlCommand(commandText, connection);
            return (bool)cmd.ExecuteScalar();
        }

        private static void CreateDiscountDb(NpgsqlConnection connection, string dbName)
        {
            if (IsDiscountDbExists(connection, dbName)) return;
            var commandText = $"CREATE DATABASE \"{dbName}\";";
            using var command = new NpgsqlCommand(commandText, connection);
            command.ExecuteNonQuery();
        }

        private static void CreateCouponTable(NpgsqlConnection connection)
        {
            var commandText = @"CREATE TABLE Coupon(
                                ID SERIAL PRIMARY KEY NOT NULL,
                                ProductName VARCHAR(24) NOT NULL,
                                Description TEXT,
                                Amount INT);";
            using var command = new NpgsqlCommand(commandText, connection);
            command.ExecuteNonQuery();
        }

        private static void SeedCouponData(NpgsqlConnection connection)
        {
            var commandText = @"INSERT INTO Coupon (ProductName, Description, Amount) 
                                            VALUES ('IPhone X', 'IPhone Discount', 150);
                                INSERT INTO Coupon (ProductName, Description, Amount) 
                                            VALUES ('Samsung 10', 'Samsung Discount', 100);";
            using var command = new NpgsqlCommand(commandText, connection);
            command.ExecuteNonQuery();
        }
    }
}
