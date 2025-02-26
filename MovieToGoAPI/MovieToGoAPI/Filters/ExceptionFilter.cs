﻿using Microsoft.AspNetCore.Mvc.Filters;

namespace MovieToGoAPI.Filters
{
    public class ExceptionFilter : ExceptionFilterAttribute
    {
        private readonly ILogger<ExceptionFilter> logger;

        public ExceptionFilter(ILogger<ExceptionFilter> logger)
        {
            this.logger = logger;
        }

        public override void OnException(ExceptionContext context)
        {
            Exception exception = context.Exception;
            Exception? innerException = exception.InnerException;
            string innerExceptionMessage = innerException == null ? string.Empty : innerException.Message;

            logger.LogError($"{exception.Message} : {innerExceptionMessage}");

            base.OnException(context);
        }
    }
}
