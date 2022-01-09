using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Services
{
    public class AuthorizationService
    {
        /// <summary>
        /// Validate a user claim by his username
        /// </summary>
        /// <param name="controller"></param>
        /// <param name="userManager"></param>
        /// <returns>The user Id if the user claim is valid else null</returns>
        public async Task<string?> validateUserClaim(Controller controller, UserManager<User> userManager)
        {
            string? username = controller.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "username")?.Value;

            User user = await userManager.FindByNameAsync(username);

            return user?.Id;
        }
    }
}
