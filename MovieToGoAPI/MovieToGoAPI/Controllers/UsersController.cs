using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MovieToGoAPI.DTOs.Users;
using MovieToGoAPI.Entities;
using MovieToGoAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace MovieToGoAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class UsersController : Controller
    {
        private readonly ILogger<UsersController> logger;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IMapper mapper;
        private readonly IConfiguration configuration;

        public UsersController(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper, IConfiguration configuration, ILogger<UsersController> logger)
        {

            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.configuration = configuration;
            this.logger = logger;
        }

        /// <summary>
        /// Create an account for a user
        /// </summary>
        /// <param name="userCreationDTO"></param>
        /// <returns></returns>
        [HttpPost("create")]
        [ProducesResponseType(typeof(AuthenticationResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(List<string>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<AuthenticationResponse>> Create([FromBody] UserCreationDTO userCreationDTO)
        {
            logger.LogInformation("Creating a user account");

            User user = mapper.Map<User>(userCreationDTO);

            IdentityResult result = await userManager.CreateAsync(user, userCreationDTO.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result);
            }

            return await BuildToken(user);
        }

        /// <summary>
        /// Login with user email
        /// </summary>
        /// <param name="userLoginDTO"></param>
        /// <returns></returns>
        [HttpPost("login")]
        [ProducesResponseType(typeof(AuthenticationResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<AuthenticationResponse>> Login([FromBody] UserLoginDTO userLoginDTO)
        {
            logger.LogInformation("Login user account");

            User user = await userManager.FindByEmailAsync(userLoginDTO.EmailOrUserName);

            if(user == null)
            {
                user = await userManager.FindByNameAsync(userLoginDTO.EmailOrUserName);

                if(user == null) // User not found by email or username
                {
                    return Unauthorized("Invalid Login Attempt");
                }
            }

            SignInResult result = await signInManager.PasswordSignInAsync(
                user.UserName, userLoginDTO.Password, isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return Unauthorized("Invalid Login Attempt");
            }

            return await BuildToken(user);
        }

        /// <summary>
        /// Add an Admin role claim to the user claims. Must be authorized (JWT bearer with policy = "IsAdmin").
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns></returns>
        [HttpPost("makeAdmin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> MakeAdmin([FromBody] UserDTO userDTO)
        {
            logger.LogInformation("Making a user an admin");

            User user = await userManager.FindByNameAsync(userDTO.UserName);

            if (user == null)
            {
                return NotFound("User not found");
            }

            IList<Claim> claims = await userManager.GetClaimsAsync(user);

            Claim? isExistingClaim = claims.FirstOrDefault(x => x.Type == "role" && x.Value == "Admin");

            if (isExistingClaim != null)
            {
                return BadRequest(new List<string>() { $"User: {user.UserName} is already an Admin"});
            }

            await userManager.AddClaimAsync(user, new Claim("role", "Admin"));

            return NoContent();
        }

        /// <summary>
        /// Remove the Admin role claim from the user claims. Must be authorized (JWT bearer with policy = "IsAdmin").
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns></returns>
        [HttpPost("removeAdmin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status404NotFound)]
        public async Task<ActionResult> RemoveAdmin([FromBody] UserDTO userDTO)
        {
            logger.LogInformation("Removing admin from a user");

            User user = await userManager.FindByNameAsync(userDTO.UserName);

            if (user == null)
            {
                return NotFound("User not found");
            }

            IList<Claim> claims = await userManager.GetClaimsAsync(user);

            Claim? isExistingClaim = claims.FirstOrDefault(x => x.Type == "role" && x.Value == "Admin");

            if (isExistingClaim == null)
            {
                return BadRequest(new List<string>() { $"User: {user.UserName} is not an Admin" });
            }

            await userManager.RemoveClaimAsync(user, new Claim("role", "Admin"));

            return NoContent();
        }

        /// <summary>
        /// Return a list of all the registered users. Must be authorized (JWT bearer with policy = "IsAdmin").
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        [ProducesResponseType(typeof(List<UserDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> Get()
        {
            logger.LogInformation("Getting all users");

            List<User> users = await userManager.Users.ToListAsync();

            if(users.Count == 0)
            {
                return NoContent();
            }

            return Ok(mapper.Map<List<UserDTO>>(users));
        }

        /// <summary>
        /// Delete a user by it's UserId. Must be authorized (JWT bearer with policy = "IsAdmin").
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        [HttpDelete("{UserId}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(typeof(IdentityResult), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Delete(string UserId)
        {
            logger.LogInformation("Deleting a user");

            User userToDelete = await userManager.FindByIdAsync(UserId);

            if(userToDelete == null)
            {
                return NotFound();
            }

            IdentityResult result = await userManager.DeleteAsync(userToDelete);

            if (!result.Succeeded)
            {
                return BadRequest(result);
            }

            return NoContent();
        }

        /**********************************************************************************************************
        * Private Methods
        ***********************************************************************************************************/
        private async Task<AuthenticationResponse> BuildToken(User user)
        {
            IList<Claim> claims = await userManager.GetClaimsAsync(user);

            claims.Add(new Claim("username", user.UserName));

            SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(configuration["Keyjwt"]));
            SigningCredentials signingCredentials = new(key, SecurityAlgorithms.HmacSha256);
            DateTime expiration = DateTime.UtcNow.AddYears(1);

            JwtSecurityToken jwtSecurityToken = new(
                issuer: null, 
                audience: null, 
                claims: claims, 
                expires: expiration, 
                signingCredentials: signingCredentials);

            AuthenticationResponse authenticationResponse = new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                TokenExpiration = expiration
            };

            return authenticationResponse;
        }
    }
}
