using Microsoft.AspNetCore.Mvc;
using MovieToGoAPI.Models;

namespace MovieToGoAPI.APIBehavior
{
    public class BadRequestBehavior
    {
        public static void Parse(ApiBehaviorOptions options)
        {
            options.InvalidModelStateResponseFactory = actionContext =>
            {
                List<ErrorMessage> errors = new();

                foreach (var modelStateDict in actionContext.ModelState)
                {
                    foreach (var error in modelStateDict.Value.Errors)
                    {
                        errors.Add(new ErrorMessage(error.ErrorMessage));
                    }
                }
                return new BadRequestObjectResult(errors);
            };
        }
    }
}
