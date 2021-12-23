using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace MovieToGoAPI.Filters
{
    public class ParseBadRequestFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            if(context.Result == null)
            {
                return;
            }

            BadRequestObjectResult badRequestObjectResult = (BadRequestObjectResult)context.Result;
            int? statusCode = badRequestObjectResult.StatusCode;
            List<string> response = new List<string>();

            switch (statusCode)
            {
                case 400:
                    if(badRequestObjectResult.Value != null)
                    {
                        foreach (var key in context.ModelState.Keys)
                        {
                            foreach (var error in context.ModelState[key].Errors)
                            {
                                response.Add($"{key}: {error.ErrorMessage}");
                            }
                        }
                    }
                    break;
                default:
                    return;
            }

            if(response.Count > 0)
            {
                context.Result = new BadRequestObjectResult(response);
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            
        }
    }
}
