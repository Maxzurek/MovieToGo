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
                List<string> errors = new();

                foreach (var modelStateDict in actionContext.ModelState)
                {
                    foreach (var error in modelStateDict.Value.Errors)
                    {
                        errors.Add(error.ErrorMessage);
                    }
                }
                return new BadRequestObjectResult(errors);
            };
        }
    }
}
