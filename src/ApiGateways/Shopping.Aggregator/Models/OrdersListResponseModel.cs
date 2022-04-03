using System.Collections.Generic;

namespace Shopping.Aggregator.Models
{
    public class OrdersListResponseModel
    {
        public IList<OrderResponseModel> OrdersList { get; set; }
    }
}
