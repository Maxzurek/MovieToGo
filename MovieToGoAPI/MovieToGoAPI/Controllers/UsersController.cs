using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MovieToGoAPI.DTOs.Users;
using MovieToGoAPI.Entities;
using MovieToGoAPI.Models;
using System.IdentityModel.Tokens.Jwt;
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
        [ProducesResponseType(typeof(List<string>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AuthenticationResponse), StatusCodes.Status200OK)]
        public async Task<ActionResult<AuthenticationResponse>> Create([FromBody] UserCreationDTO userCreationDTO)
        {
            logger.LogInformation("Creating a user account");

            User user = mapper.Map<User>(userCreationDTO);

            IdentityResult result = await userManager.CreateAsync(user, userCreationDTO.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result);
            }

            return BuildToken(user);
        }

        /// <summary>
        /// Login with user email
        /// </summary>
        /// <param name="userLoginDTO"></param>
        /// <returns></returns>
        [HttpPost("login")]
        [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(AuthenticationResponse), StatusCodes.Status200OK)]
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

            return BuildToken(user);
        }

        [HttpDelete("{UserId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(string UserId)
        {
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
        private AuthenticationResponse BuildToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("username", user.UserName)
        };

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Keyjwt"]));
            SigningCredentials signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            DateTime expiration = DateTime.UtcNow.AddYears(1);

            JwtSecurityToken jwtSecurityToken = new JwtSecurityToken(
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
