using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.DTOs.Users;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger logger;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IMapper mapper;

        public UsersController(ILogger logger, UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
        {
            this.logger = logger;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
        }

        /// <summary>
        /// Get all registered users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<List<UserDTO>>> Get()
        {
            logger.LogInformation("Getting all users");

            var users = await userManager.Users.ToListAsync();

            if (users.Count == 0)
            {
                return NoContent();
            }

            return mapper.Map<List<UserDTO>>(users);
        }

        /// <summary>
        /// Create a user
        /// </summary>
        /// <param name="userRegistrationDTO"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("register")]
        [ProducesResponseType(typeof(IdentityResult), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Post([FromBody]UserRegistrationDTO userRegistrationDTO)
        {
            User user = mapper.Map<User>(userRegistrationDTO);

            IdentityResult result = await userManager.CreateAsync(user, userRegistrationDTO.Password);

            if(!result.Succeeded)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
