using Ordering.Application.Common.Interfaces;

namespace Ordering.API.Services
{
    public class UserService : ICurrentUserService
    {
        public UserService()
        {
            //TODO rework when identity will be implemented
            UserId = "1";
            IsAuthenticated = UserId != null;
        }

        public string UserId { get; }
        public bool IsAuthenticated { get; }
    }
}
