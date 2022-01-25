using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MovieToGoAPI.DTOs.WatchListItems;
using MovieToGoAPI.Entities;
using MovieToGoAPI.Models;
using MovieToGoAPI.Services;

namespace MovieToGoAPI.Controllers
{
    [Route("api/watchlistitems")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class WatchListItemsController : Controller
    {
        private readonly ILogger<WatchListItemsController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly UserManager<User> userManager;
        private readonly AuthorizationService authorizationService;

        public WatchListItemsController(
            ILogger<WatchListItemsController> logger, 
            ApplicationDbContext context, 
            IMapper mapper, 
            AuthorizationService authorizationService, 
            UserManager<User> userManager)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
            this.authorizationService = authorizationService;
            this.userManager = userManager;
        }

        /// <summary>
        /// Get all WatchListItems. Must be authorized (JWT bearer with policy = "IsAdmin").
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        [ProducesResponseType(typeof(List<WatchListItemDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<WatchListItemDTO>>> GetAll()
        {
            logger.LogInformation("Getting all WatchListItems");

            List<WatchListItem> watchListItems = await context.WatchListItems
                .Include(x => x.Movie)
                .ToListAsync();

            if (watchListItems.Count == 0)
            {
                return NoContent();
            }

            return Ok(mapper.Map<List<WatchListItemDTO>>(watchListItems));
        }

        /// <summary>
        /// Get a WatchListItem by Id. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet("{Id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(WatchListItemDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<WatchListItemDTO>> GetById(int Id)
        {
            logger.LogInformation("Getting a WatchListItem by Id");

            WatchListItem? watchListItem = await context.WatchListItems
                .Include(x => x.Movie)
                .FirstOrDefaultAsync(x => x.Id == Id);

            if (watchListItem == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<WatchListItemDTO>(watchListItem));
        }

        /// <summary>
        /// Get all watchlistitems by watchlist Id. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="WatchListId"></param>
        /// <returns></returns>
        [HttpGet("watchlist/{WatchListId:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(List<WatchListItemDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<List<WatchListItemDTO>>> GetByWatchListId(int WatchListId)
        {
            logger.LogInformation("Getting all watchlistitems by WatchListId");

            List<WatchListItem>? watchListItems = await context.WatchListItems
                .Include(x => x.Movie)
                .Where(x => x.WatchListId == WatchListId)
                .ToListAsync();

            if (watchListItems.Count == 0)
            {
                return NoContent();
            }

            return Ok(mapper.Map<List<WatchListItemDTO>>(watchListItems));
        }

        /// <summary>
        /// Create a watchlistitem. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="watchListItemCreationDTO"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(WatchListItemDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(List<string>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> Post([FromBody] WatchListItemCreationDTO watchListItemCreationDTO)
        {
            logger.LogInformation("Creating a watchlist item");

            string? userId = await authorizationService.validateUserClaim(this, userManager);

            if (userId == null)
            {
                return Unauthorized("Unauthorized. You must be logged in in order to post a watchlist item");
            }

            WatchListItem? existingWatchListItem = await context.WatchListItems.FirstOrDefaultAsync(
                    x => x.WatchListId == watchListItemCreationDTO.WatchListId && x.MovieId == watchListItemCreationDTO.MovieId);

            if(existingWatchListItem != null)
            {
                return BadRequest(
                    new List<string>
                    {
                        $"Movie with id: {watchListItemCreationDTO.MovieId} is already in watchlist with id: {watchListItemCreationDTO.WatchListId}" 
                    });
            }

            WatchListItem watchListItem = mapper.Map<WatchListItem>(watchListItemCreationDTO);

            EntityEntry<WatchListItem> entityEntry = context.WatchListItems.Add(watchListItem);

            await context.SaveChangesAsync();
            await entityEntry.Reference(x => x.Movie).LoadAsync();

            return Ok(mapper.Map<WatchListItemDTO>(entityEntry.Entity));
        }

        /// <summary>
        /// Update a watchlistitem. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="watchListItemUpdateDTO"></param>
        /// <returns></returns>
        [HttpPut("{Id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(WatchListItemDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Put(int Id, [FromBody] WatchListItemUpdateDTO watchListItemUpdateDTO)
        {
            WatchListItem? watchListItem = await context.WatchListItems.FirstOrDefaultAsync(x => x.Id == Id);

            if (watchListItem == null)
            {
                return NotFound();
            }

            watchListItem = mapper.Map(watchListItemUpdateDTO, watchListItem);
            await context.SaveChangesAsync();

            return Ok(mapper.Map<WatchListItemDTO>(watchListItem));
        }

        /// <summary>
        /// Delete a watchlistitem. Must be authorized (JWT bearer).
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
            WatchListItem? watchListItem = await context.WatchListItems.FirstOrDefaultAsync(x => x.Id == Id);

            if (watchListItem == null)
            {
                return NotFound();
            }

            context.Remove(watchListItem);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
