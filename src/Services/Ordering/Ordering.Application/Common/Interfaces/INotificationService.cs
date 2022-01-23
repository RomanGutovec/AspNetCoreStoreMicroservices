using System.Threading.Tasks;
using Ordering.Application.Notifications.Models;

namespace Ordering.Application.Common.Interfaces
{
    public interface INotificationService
    {
        Task<EmailResponse> SendAsync(MessageDto message);
    }
}
