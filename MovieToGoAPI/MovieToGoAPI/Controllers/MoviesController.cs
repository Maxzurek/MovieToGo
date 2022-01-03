using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.DTOs.Movies;
using MovieToGoAPI.Entities;

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
        /// <param name="theMovieDbId"></param>
        /// <returns></returns>
        [HttpGet("{theMovieDbId:int}")]
        [ProducesResponseType(typeof(MovieDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MovieDTO>> GetByTheMovieDbId(int theMovieDbId)
        {
            logger.LogInformation("Getting movie by his TheMovieDb Id");

            var movie = await context.Movies.FirstOrDefaultAsync(x => x.TheMovieDbApiId == theMovieDbId);

            if (movie == null)
            {
                return NotFound();
            }

            return mapper.Map<MovieDTO>(movie);
        }

        /// <summary>
        /// Create a movie
        /// </summary>
        /// <param name="movieCreationDTO"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Post([FromBody] MovieCreationDTO movieCreationDTO)
        {
            logger.LogInformation("Creating movie");

            Movie movie = mapper.Map<Movie>(movieCreationDTO);

            context.Movies.Add(movie);
            await context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Update a movie by his MovieToGo Id
        /// </summary>
        /// <param name="movieToGoId"></param>
        /// <param name="movieCreationDTO"></param>
        /// <returns></returns>
        [HttpPut("{movieToGoId:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Put(int movieToGoId, [FromBody] MovieCreationDTO movieCreationDTO)
        {
            var movie = await context.Movies.FirstOrDefaultAsync(x => x.Id == movieToGoId);

            if (movie == null)
            {
                return NotFound();
            }

            movie = mapper.Map<Movie>(movieCreationDTO);
            await context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Delete a movie by his MovieToGo Id
        /// </summary>
        /// <param name="movieToGoId"></param>
        /// <returns></returns>
        [HttpDelete("{movieToGoId:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int movieToGoId)
        {
            var movie = await context.Movies.FirstOrDefaultAsync(x => x.Id == movieToGoId);

            if (movie == null)
            {
                return NotFound();
            }

            context.Movies.Remove(movie);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
