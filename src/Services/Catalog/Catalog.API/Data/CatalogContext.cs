using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Catalog.API.Entities;
using MongoDB.Driver;

namespace Catalog.API.Data
{
    public class CatalogContext : ICatalogContext
    {
        private readonly IMongoDatabase mongoDatabase;

        public CatalogContext(IMongoClient mongoClient, string dbName, string collectionName)
        {
            mongoDatabase = mongoClient.GetDatabase(dbName);
            Products = mongoDatabase.GetCollection<Product>(collectionName);
        }

        public IMongoCollection<Product> Products { get; }
    }
}
