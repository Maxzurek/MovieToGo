using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.DTOs.WatchLists;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Controllers
{
    [Route("api/watchlists")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class WatchListsController : Controller
    {
        private readonly ILogger<GenresController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public WatchListsController(ILogger<GenresController> logger, ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        /// <summary>
        /// Get all WatchLists
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(List<WatchListDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<List<WatchListDTO>>> Get()
        {
            logger.LogInformation("Getting all watchlists");

            List<WatchList> watchlists = await context.WatchLists.ToListAsync();

            if (watchlists.Count == 0)
            {
                return NoContent();
            }

            return mapper.Map<List<WatchListDTO>>(watchlists);
        }

        /// <summary>
        /// Create a watchlist
        /// </summary>
        /// <param name="watchListCreationDTO"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Post([FromBody] WatchListCreationDTO watchListCreationDTO)
        {
            logger.LogInformation("Creating a watchlist");

            WatchList watchList = mapper.Map<WatchList>(watchListCreationDTO);

            context.WatchLists.Add(watchList);

            try
            {
                await context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                logger?.LogError(ex.InnerException.Message);
                return BadRequest(ex.InnerException.Message);
            }

            return NoContent();
        }
    }
}
