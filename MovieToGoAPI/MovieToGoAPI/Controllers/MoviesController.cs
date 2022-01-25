using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MovieToGoAPI.DTOs.Movies;
using MovieToGoAPI.Entities;
using MovieToGoAPI.Models;
using System.Net;

namespace MovieToGoAPI.Controllers
{
    [Route("api/movies")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public class MoviesController : Controller
    {
        private readonly ILogger<MoviesController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public MoviesController(ILogger<MoviesController> logger, ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        /// <summary>
        /// Get all TheMovieDb movies references with MovieToGo votes. Must be authorized (JWT bearer with policy = "IsAdmin").
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        [ProducesResponseType(typeof(List<MovieDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<MovieDTO>>> Get()
        {
            logger.LogInformation("Getting all movies");

            List<Movie> movies = await context.Movies.Include(x => x.MovieReviews).ToListAsync();

            if (movies.Count == 0)
            {
                return NoContent();
            }

            return Ok(mapper.Map<List<MovieDTO>>(movies));
        }

        /// <summary>
        /// Get a movie by his MovieToGo Id
        /// </summary>
        /// <param name="MovieToGoId"></param>
        /// <returns></returns>
        [HttpGet("{MovieToGoId:int}")]
        [ProducesResponseType(typeof(MovieDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MovieDTO>> GetByMovieToGoId(int MovieToGoId)
        {
            logger.LogInformation("Getting movie by his Id");

            Movie? movie = await context.Movies.Include(x => x.MovieReviews).FirstOrDefaultAsync(x => x.Id == MovieToGoId);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<MovieDTO>(movie));
        }

        /// <summary>
        /// Get a movie by his TheMovieDb Id
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet("themoviedb/{Id:int}")]
        [ProducesResponseType(typeof(MovieDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MovieDTO>> GetByTheMovieDbId(int Id)
        {
            logger.LogInformation("Getting movie by his TheMovieDb Id");

            Movie? movie = await context.Movies.Include(x => x.MovieReviews).FirstOrDefaultAsync(x => x.TheMovieDbId == Id);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<MovieDTO>(movie));
        }

        /// <summary>
        /// Create a movie
        /// </summary>
        /// <param name="movieCreationDTO"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(typeof(MovieDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(List<string>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Movie>> Post([FromBody] MovieCreationDTO movieCreationDTO)
        {
            logger.LogInformation("Creating a movie");

            Movie? existingMovie =  await context.Movies.FirstOrDefaultAsync(x => x.TheMovieDbId == movieCreationDTO.TheMovieDbId);

            if(existingMovie != null) // We already have a reference to TheMovieDb movie Id in our database, no need to add it again
            {
                logger.LogInformation("Movie already in database - OK");
                return Ok(mapper.Map<MovieDTO>(existingMovie));
            }

            Movie movie = mapper.Map<Movie>(movieCreationDTO);

            EntityEntry<Movie> entityEntry = context.Movies.Add(movie);
            await context.SaveChangesAsync();

            return Ok(mapper.Map<MovieDTO>(entityEntry.Entity));
        }

        /// <summary>
        /// Update a movie by his MovieToGo Id. Must be authorized (JWT bearer with policy = "IsAdmin").
        /// </summary>
        /// <param name="movieToGoId"></param>
        /// <param name="movieUpdateDTO"></param>
        /// <returns></returns>
        [HttpPut("{movieToGoId:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        [ProducesResponseType(typeof(MovieDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Movie>> Put(int movieToGoId, [FromBody] MovieUpdateDTO movieUpdateDTO)
        {
            logger.LogInformation("Updating a movie");

            Movie? movie = await context.Movies.FirstOrDefaultAsync(x => x.Id == movieToGoId);

            if (movie == null)
            {
                return NotFound();
            }

            movie = mapper.Map(movieUpdateDTO, movie);
            await context.SaveChangesAsync();

            return Ok(mapper.Map<MovieDTO>(movie));
        }

        /// <summary>
        /// Delete a movie by his MovieToGo Id. Must be authorized (JWT bearer with policy = "IsAdmin").
        /// </summary>
        /// <param name="movieToGoId"></param>
        /// <returns></returns>
        [HttpDelete("{movieToGoId:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int movieToGoId)
        {
            logger.LogInformation("Deleting a movie");

            Movie? movie = await context.Movies.FirstOrDefaultAsync(x => x.Id == movieToGoId);

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
