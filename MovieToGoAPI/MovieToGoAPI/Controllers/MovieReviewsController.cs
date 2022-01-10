using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MovieToGoAPI.DTOs.MovieReviews;
using MovieToGoAPI.Entities;
using MovieToGoAPI.Models;

namespace MovieToGoAPI.Controllers
{
    [Route("api/movieReviews")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]

    public class MovieReviewsController : Controller
    {
        private readonly ILogger<MovieReviewsController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public MovieReviewsController(ILogger<MovieReviewsController> logger, ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        /// <summary>
        /// Get all movie Reviews
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(List<MovieReviewDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<List<MovieReviewDTO>>> Get()
        {
            logger.LogInformation("Getting all Movie Reviews");

            List<MovieReview> movieReviews = await context.MovieReviews.ToListAsync();

            if (movieReviews.Count == 0)
            {
                return NoContent();
            }

            return mapper.Map<List<MovieReviewDTO>>(movieReviews);
        }


        /// <summary>
        /// Get Movie Review by ID
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet("{Id:int}")]
        [ProducesResponseType(typeof(MovieReviewDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MovieReviewDTO>> GetReviewById(int Id)
        {
            logger.LogInformation("Getting Movie Review by id");

            MovieReview? movieReview = await context.MovieReviews.FirstOrDefaultAsync(x => x.Id == Id);

            if (movieReview == null)
            {
                return NotFound();
            }

            return mapper.Map<MovieReviewDTO>(movieReview);
        }


        /// <summary>
        /// Get all movie Reviews by Moovie Id
        /// </summary>
        /// <param name="MovieId"></param>
        /// <returns></returns>
        [HttpGet("movie/{MovieId:int}")]
        [ProducesResponseType(typeof(List<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<List<MovieReviewDTO>>> GetByMovieId(int MovieId)
        {
            logger.LogInformation("Getting all movie Reviews by MovieId");

            List<MovieReview>? movieReviews = await context.MovieReviews
                .Where(x => x.MovieId == MovieId)
                .ToListAsync();

            if (movieReviews.Count == 0)
            {
                return NoContent();
            }

            return mapper.Map<List<MovieReviewDTO>>(movieReviews);
        }

        /// <summary>
        /// Create Movie Review
        /// </summary>
        /// <param name="movieReviewCreationDTO"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(typeof(MovieReviewDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(List<ErrorMessage>), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<MovieReviewDTO>> Post([FromBody] MovieReviewCreationDTO movieReviewCreationDTO)
        {
            logger.LogInformation("Creating Movie Review");

            MovieReview? movieReview = mapper.Map<MovieReview>(movieReviewCreationDTO);

            EntityEntry<MovieReview> entityEntry = context.MovieReviews.Add(movieReview);

            await context.SaveChangesAsync();

            await entityEntry.Reference(x => x.User).LoadAsync();

            return Ok(mapper.Map<MovieReviewDTO>(entityEntry.Entity));
        }


        /// <summary>
        /// Update Movie Review by ID
        /// </summary>
        /// <param name="id"></param>
        /// <param name="movieReviewUpdateDTO"></param>
        /// <returns></returns>
        [HttpPut("{id:int}")]
        [ProducesResponseType(typeof(MovieReviewDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MovieReviewDTO>> Put(int id, [FromBody] MovieReviewUpdateDTO movieReviewUpdateDTO)
        {
            MovieReview? movieReview = await context.MovieReviews.FirstOrDefaultAsync(x => x.Id == id);

            if (movieReview == null)
            {
                return NotFound();
            }

            movieReview = mapper.Map(movieReviewUpdateDTO, movieReview);
            await context.SaveChangesAsync();

            return Ok(mapper.Map<MovieReviewDTO>(movieReview));
        }


        /// <summary>
        /// Delete movie Review by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int id)
        {
            MovieReview? movieReview = await context.MovieReviews.FirstOrDefaultAsync(x => x.Id == id);

            if (movieReview == null)
            {
                return NotFound();
            }

            context.MovieReviews.Remove(movieReview);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
