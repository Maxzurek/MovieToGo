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
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IMapper mapper;

        public UsersController(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            return await userManager.Users.ToListAsync();
        }

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
