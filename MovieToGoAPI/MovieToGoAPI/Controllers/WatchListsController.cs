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
        private readonly ILogger<WatchListsController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public WatchListsController(ILogger<WatchListsController> logger, ApplicationDbContext context, IMapper mapper)
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
        public async Task<ActionResult<List<WatchListDTO>>> GetAll()
        {
            logger.LogInformation("Getting all watchlists");

            List<WatchList> watchlists = await context.WatchLists.Include(x=> x.User ).Include(x => x.WatchListItems).ToListAsync();

            if (watchlists.Count == 0)
            {
                return NoContent();
            }

            return mapper.Map<List<WatchListDTO>>(watchlists);
        }

        /// <summary>
        /// Get a watchlist by his Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet("{Id:int}")]
        [ProducesResponseType(typeof(List<WatchListDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<WatchListDTO>> GetById(int Id)
        {
            logger.LogInformation("Getting a watchlist by id");

            WatchList? watchlist = await context.WatchLists
                .Include(x => x.User)
                .Include(x => x.WatchListItems)
                .FirstOrDefaultAsync(x => x.Id == Id);

            if (watchlist == null)
            {
                return NoContent();
            }

            return mapper.Map<WatchListDTO>(watchlist);
        }

        /// <summary>
        /// Get a user's watchlists
        /// </summary>
        /// <param name="UserId"></param>
        /// <returns></returns>
        [HttpGet("{UserId}")]
        [ProducesResponseType(typeof(List<WatchListDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<List<WatchListDTO>>> GetByUserId(string UserId)
        {
            logger.LogInformation("Getting all user's watchlists");

            List<WatchList> watchlists = await context.WatchLists.Include(x => x.User).Include(x => x.WatchListItems).Where(x => x.UserId == UserId).ToListAsync();


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

            await context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Update a watchlist
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="watchListUpdateDTO"></param>
        /// <returns></returns>
        [HttpPut("{Id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult> Put(int Id, [FromBody] WatchListUpdateDTO watchListUpdateDTO)
        {
            WatchList? watchList = await context.WatchLists.FirstOrDefaultAsync(x => x.Id == Id);

            if (watchList == null)
            {
                return NotFound();
            }

            watchList = mapper.Map(watchListUpdateDTO, watchList);
            await context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Delete a watchlist
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int Id)
        {
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
