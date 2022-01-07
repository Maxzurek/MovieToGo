using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MovieToGoAPI.DTOs.Authentication;
using MovieToGoAPI.DTOs.Users;
using MovieToGoAPI.Entities;
using MovieToGoAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace MovieToGoAPI.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class AccountsController : Controller
    {

        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IMapper mapper;
        private readonly IConfiguration configuration;

        public AccountsController(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper, IConfiguration configuration)
        {

            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
            this.configuration = configuration;
        }

        /// <summary>
        /// Create an account for a user
        /// </summary>
        /// <param name="userCreationDTO"></param>
        /// <returns></returns>
        [HttpPost("create")]
        [ProducesResponseType(typeof(List<ErrorMessage>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AuthenticationResponse), StatusCodes.Status200OK)]
        public async Task<ActionResult<AuthenticationResponse>> Create([FromBody] UserCreationDTO userCreationDTO)
        {
            User user = mapper.Map<User>(userCreationDTO);

            IdentityResult result = await userManager.CreateAsync(user, userCreationDTO.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result);
            }

            return BuildToken(userCreationDTO);
        }

        /// <summary>
        /// Login with user email
        /// </summary>
        /// <param name="userLoginDTO"></param>
        /// <returns></returns>
        [HttpPost("login")]
        [ProducesResponseType(typeof(SignInResult), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(AuthenticationResponse), StatusCodes.Status200OK)]
        public async Task<ActionResult<AuthenticationResponse>> Login([FromBody] UserLoginDTO userLoginDTO)
        {
            User user = await userManager.FindByEmailAsync(userLoginDTO.Email);
            string userName = user == null ? "" : user.UserName;

            SignInResult result = await signInManager.PasswordSignInAsync(
                userName, userLoginDTO.Password, isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return BadRequest(result);
            }

            return BuildToken(userLoginDTO);
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
        private AuthenticationResponse BuildToken(UserCreationDTO userCreationDTO)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("email", userCreationDTO.Email)
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Keyjwt"]));
            SigningCredentials signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            DateTime expiration = DateTime.UtcNow.AddYears(1);
            JwtSecurityToken jwtSecurityToken = new JwtSecurityToken(
                issuer: null, audience: null, claims: claims, expires: expiration, signingCredentials: signingCredentials);

            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Expiration = expiration
            };
        }

        private AuthenticationResponse BuildToken(UserLoginDTO userLoginDTO)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("email", userLoginDTO.Email)
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Keyjwt"]));
            SigningCredentials signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            DateTime expiration = DateTime.UtcNow.AddYears(1);

            JwtSecurityToken jwtSecurityToken = new JwtSecurityToken(
                issuer: null, audience: null, claims: claims, expires: expiration, signingCredentials: signingCredentials);

            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                Expiration = expiration
            };
        }
    }
}
