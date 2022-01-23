using System;

namespace Ordering.Application.Notifications.Exceptions
{
    public class NotificationServiceException : Exception
    {
        public string Body { get; }

        public NotificationServiceException(string message, string body) : base(message)
        {
            Body = body;
        }

        public NotificationServiceException(string message, string body, Exception innerException) : base(message, innerException)
        {
            Body = body;
        }
    }
}
