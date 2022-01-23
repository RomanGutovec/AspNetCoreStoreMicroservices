using System;

namespace Ordering.Application.Notifications.Models
{
    public class EmailResponse
    {
        public DateTime DateSent { get; set; }
        public string UniqueMessageId { get; set; }
    }
}
