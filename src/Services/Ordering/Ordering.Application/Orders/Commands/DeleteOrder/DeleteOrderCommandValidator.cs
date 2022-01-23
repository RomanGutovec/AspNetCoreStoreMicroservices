using FluentValidation;

namespace Ordering.Application.Orders.Commands.DeleteOrder
{
    public class DeleteOrderCommandValidator : AbstractValidator<DeleteOrderCommand>
    {
        public DeleteOrderCommandValidator()
        {
            RuleFor(v => v.Id).NotEqual(0);
        }
    }
}
