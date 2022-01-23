using System;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Ordering.Application.Common.Interfaces;
using Ordering.Application.Notifications.Exceptions;
using Ordering.Application.Notifications.Models;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Ordering.Infrastructure
{
    public class NotificationService : INotificationService
    {
        private static readonly string MessageId = "X-Message-Id";
        private readonly ILogger<NotificationService> logger;
        private readonly NotificationConfiguration configuration;


        public NotificationService(IOptions<NotificationConfiguration> configuration, ILogger<NotificationService> logger)
        {
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
            this.configuration = configuration.Value ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<EmailResponse> SendAsync(MessageDto message)
        {
            var client = new SendGridClient(configuration.ApiKey);

            var emailMessage = new SendGridMessage()
            {
                From = new EmailAddress(message.From),
                Subject = message.Subject,
                HtmlContent = message.Body
            };

            emailMessage.AddTo(new EmailAddress(message.To));

            return ProcessResponse(await client.SendEmailAsync(emailMessage));
        }

        private EmailResponse ProcessResponse(Response response)
        {
            if (response.StatusCode.Equals(System.Net.HttpStatusCode.Accepted)
                || response.StatusCode.Equals(System.Net.HttpStatusCode.OK))
            {
                var emailResponse = ToMailResponse(response);
                logger.LogInformation($"Message with id:{emailResponse.UniqueMessageId} was sent");
                return emailResponse;
            }

            var errorResponse = response.Body.ReadAsStringAsync().Result;

            logger.LogError($"Message sending failed.");
            throw new NotificationServiceException(response.StatusCode.ToString(), errorResponse);
        }

        private static EmailResponse ToMailResponse(Response response)
        {
            if (response == null)
                return null;

            var headers = (HttpHeaders)response.Headers;
            var messageId = headers.GetValues(MessageId).FirstOrDefault();
            return new EmailResponse
            {
                UniqueMessageId = messageId,
                DateSent = DateTime.UtcNow,
            };
        }
    }
}
