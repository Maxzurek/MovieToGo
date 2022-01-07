using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using MovieToGoAPI.Models;

namespace MovieToGoAPI.Filters
{
    public class ParseBadRequestFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            IStatusCodeActionResult? result = context.Result as IStatusCodeActionResult;

            if(result == null)
            {
                return;
            }

            int? statusCode = result.StatusCode;

            if(statusCode == StatusCodes.Status400BadRequest)
            {
                List<string> response = new();
                BadRequestObjectResult? badRequestObjectResult = context.Result as BadRequestObjectResult;

                if(badRequestObjectResult == null || badRequestObjectResult.Value == null)
                {
                    return;
                }

                if(badRequestObjectResult.Value is IdentityResult)
                {
                    IdentityResult identityResult = (IdentityResult)badRequestObjectResult.Value;

                    foreach (var error in identityResult.Errors)
                    {
                        response.Add(error.Description);
                    }

                    context.Result = new BadRequestObjectResult(response);
                }

            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
        }
    }
}
