using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MovieToGoAPI.DTOs.WatchLists;
using MovieToGoAPI.Entities;
using MovieToGoAPI.Models;
using MovieToGoAPI.Services;

namespace MovieToGoAPI.Controllers
{
    [Route("api/watchlists")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class WatchListsController : Controller
    {
        private readonly ILogger<WatchListsController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly UserManager<User> userManager;
        private readonly AuthorizationService authorizationService;

        public WatchListsController(
            ILogger<WatchListsController> logger, 
            ApplicationDbContext context, 
            IMapper mapper,
            UserManager<User> userManager,
            AuthorizationService authorizationService)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
            this.userManager = userManager;
            this.authorizationService = authorizationService;
        }

        /// <summary>
        /// Get all WatchLists. Must be authorized (JWT bearer with policy = "IsAdmin").
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        [ProducesResponseType(typeof(List<WatchListDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<WatchListDTO>>> GetAll()
        {
            logger.LogInformation("Getting all WatchLists");

            List<WatchList> watchlists = await context.WatchLists.Include(x=> x.User ).Include(x => x.WatchListItems).ToListAsync();

            if (watchlists.Count == 0)
            {
                return NoContent();
            }

            return Ok(mapper.Map<List<WatchListDTO>>(watchlists));
        }

        /// <summary>
        /// Get a WatchList by his Id. Must be authorized (JWT bearer). 
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet("{Id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(List<WatchListDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<WatchListDTO>> GetById(int Id)
        {
            logger.LogInformation("Getting a WatchList by Id");

            WatchList? watchlist = await context.WatchLists
                .Include(x => x.User)
                .Include(x => x.WatchListItems)
                .FirstOrDefaultAsync(x => x.Id == Id);

            if (watchlist == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<WatchListDTO>(watchlist));
        }

        /// <summary>
        /// Get a user watchlist. Must be authorized (JWT bearer).
        /// </summary>
        /// <returns></returns>
        [HttpGet("user")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(List<WatchListDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<WatchListDTO>>> GetByUserId()
        {
            logger.LogInformation("Getting a user's WatchLists");

            string? userId = await authorizationService.validateUserClaim(this, userManager);

            if (userId == null)
            {
                return Unauthorized("Unauthorized. You must be logged in in order to get a user watchlist");
            }

            List<WatchList> watchlists = await context.WatchLists.Include(x => x.User).Include(x => x.WatchListItems).Where(x => x.UserId == userId).ToListAsync();

            if (watchlists.Count == 0)
            {
                return NoContent();
            }

            return Ok(mapper.Map<List<WatchListDTO>>(watchlists));
        }

        /// <summary>
        /// Create a WatchList. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="watchListCreationDTO"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(WatchListDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(List<string>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> Post([FromBody] WatchListCreationDTO watchListCreationDTO)
        {
            logger.LogInformation("Creating a WatchList");

            string? userId = await authorizationService.validateUserClaim(this, userManager);

            if (userId == null)
            {
                return Unauthorized("Unauthorized. You must be logged in in order to post a watchlist");
            }

            WatchList watchList = mapper.Map<WatchList>(watchListCreationDTO);
            watchList.UserId = userId;

            EntityEntry<WatchList> entityEntry = context.WatchLists.Add(watchList);

            await context.SaveChangesAsync();
            await entityEntry.Reference(x => x.User).LoadAsync();
            await entityEntry.Collection(x => x.WatchListItems).LoadAsync();

            return Ok(mapper.Map<WatchListDTO>(entityEntry.Entity));
        }

        /// <summary>
        /// Update a WatchList. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="watchListUpdateDTO"></param>
        /// <returns></returns>
        [HttpPut("{Id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(WatchListDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult> Put(int Id, [FromBody] WatchListUpdateDTO watchListUpdateDTO)
        {
            logger.LogInformation("Updating a WatchList");

            WatchList? watchList = await context.WatchLists.FirstOrDefaultAsync(x => x.Id == Id);

            if (watchList == null)
            {
                return NotFound();
            }

            watchList = mapper.Map(watchListUpdateDTO, watchList);
            await context.SaveChangesAsync();

            return Ok(mapper.Map<WatchListDTO>(watchList));
        }

        /// <summary>
        /// Delete a WatchList. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int Id)
        {
            logger.LogInformation("Deleting a WatchList");

            WatchList? watchList = await context.WatchLists.FirstOrDefaultAsync(x => x.Id == Id);

            if (watchList == null)
            {
                return NotFound();
            }

            context.Remove(watchList);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
