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
        /// Get all watchlistitems
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(List<WatchListItemDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<List<WatchListItemDTO>>> GetAll()
        {
            logger.LogInformation("Getting all watchlistitems");

            List<WatchListItem> watchListItems = await context.WatchListItems
                .Include(x => x.Movie)
                .ToListAsync();

            if (watchListItems.Count == 0)
            {
                return NoContent();
            }

            return mapper.Map<List<WatchListItemDTO>>(watchListItems);
        }

        /// <summary>
        /// Get a watchlistitem by Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet("{Id:int}")]
        [ProducesResponseType(typeof(WatchListItemDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<WatchListItemDTO>> GetById(int Id)
        {
            logger.LogInformation("Getting a watchlistitem by id");

            WatchListItem? watchListItem = await context.WatchListItems
                .Include(x => x.Movie)
                .FirstOrDefaultAsync(x => x.Id == Id);

            if (watchListItem == null)
            {
                return NoContent();
            }

            return mapper.Map<WatchListItemDTO>(watchListItem);
        }

        /// <summary>
        /// Get all watchlistitems by watchlist Id
        /// </summary>
        /// <param name="WatchListId"></param>
        /// <returns></returns>
        [HttpGet("watchlist/{WatchListId:int}")]
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

            return mapper.Map<List<WatchListItemDTO>>(watchListItems);
        }

        /// <summary>
        /// Create a watchlistitem
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

            WatchListItem watchListItem = mapper.Map<WatchListItem>(watchListItemCreationDTO);

            EntityEntry<WatchListItem> entityEntry = context.WatchListItems.Add(watchListItem);

            await context.SaveChangesAsync();
            await entityEntry.Reference(x => x.Movie).LoadAsync();

            return Ok(mapper.Map<WatchListItemDTO>(entityEntry.Entity));
        }

        /// <summary>
        /// Update a watchlistitem
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="watchListItemUpdateDTO"></param>
        /// <returns></returns>
        [HttpPut("{Id:int}")]
        [ProducesResponseType(typeof(WatchListItemDTO), StatusCodes.Status200OK)]
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
        /// Delete a watchlistitem
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
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
