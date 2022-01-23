using System;
using Ordering.Application.Common.Interfaces;

namespace Ordering.Infrastructure
{
    public class DateTimeMachine : IDateTime
    {
        public DateTime Now => DateTime.Now;

        public int CurrentYear => DateTime.Now.Year;
    }
}
