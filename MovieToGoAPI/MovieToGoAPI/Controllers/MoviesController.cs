using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.DTOs.Movies;

namespace MovieToGoAPI.Controllers
{
    [Route("api/movies")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class MoviesController : Controller
    {
        private readonly ILogger<GenresController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public MoviesController(ILogger<GenresController> logger, ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        /// <summary>
        /// Get all TheMovieDb movies references with MovieToGo votes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(List<MovieDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<List<MovieDTO>>> Get()
        {
            logger.LogInformation("Getting all movies");

            var movies = await context.Movies.ToListAsync();

            if (movies.Count == 0)
            {
                return NoContent();
            }

            return mapper.Map<List<MovieDTO>>(movies);
        }

        /// <summary>
        /// Get a movie by his TheMovieDb Id
        /// </summary>
        /// <param name="TheMovieDbId"></param>
        /// <returns></returns>
        [HttpGet("{TheMovieDbId:int}")]
        [ProducesResponseType(typeof(MovieDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MovieDTO>> GetByTheMovieDbId(int TheMovieDbId)
        {
            logger.LogInformation("Getting movie by his TheMovieDb Id");

            var movie = await context.Movies.FirstOrDefaultAsync(x => x.TheMovieDbApiId == TheMovieDbId);

            if (movie == null)
            {
                return NotFound();
            }

            return mapper.Map<MovieDTO>(movie);
        }
    }
}
