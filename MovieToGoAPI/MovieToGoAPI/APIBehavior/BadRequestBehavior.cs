using Microsoft.AspNetCore.Mvc;

namespace MovieToGoAPI.APIBehavior
{
    public class BadRequestBehavior
    {
        public static void Parse(ApiBehaviorOptions options)
        {
            options.InvalidModelStateResponseFactory = context =>
            {
                List<string> response = new List<string>();

                foreach (var key in context.ModelState.Keys)
                {
                    foreach (var error in context.ModelState[key].Errors)
                    {
                        response.Add($"{key}: {error.ErrorMessage}");
                    }
                }

                return new BadRequestObjectResult(response);
            };
        }
    }
}
