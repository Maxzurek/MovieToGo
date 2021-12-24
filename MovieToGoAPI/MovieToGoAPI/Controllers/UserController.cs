using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MovieToGoAPI.DTOs;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IMapper mapper;

        public UserController(UserManager<User> userManager, IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return NoContent();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Post([FromBody]UserRegistrationDTO userRegistrationDTO)
        {
            User user = mapper.Map<User>(userRegistrationDTO);

            try
            {
                var result = await userManager.CreateAsync(user, userRegistrationDTO.Password);
                return Ok(result);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
