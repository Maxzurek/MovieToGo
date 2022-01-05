using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.DTOs.MovieReviews;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Controllers
{
    [Route("api/movieReviews")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]

    public class MovieReviewsController : Controller
    {
        private readonly ILogger<GenresController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public MovieReviewsController(ILogger<GenresController> logger, ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }


        [HttpGet]
        [ProducesResponseType(typeof(List<MovieReviewDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<List<MovieReviewDTO>>> Get()
        {
            logger.LogInformation("Getting all Movie Reviews");

            var movieReviews = await context.MovieReviews.ToListAsync();

            if (movieReviews.Count == 0)
            {
                return NoContent();
            }

            return mapper.Map<List<MovieReviewDTO>>(movieReviews);
        }



        [HttpGet("{Id:int}")]
        [ProducesResponseType(typeof(MovieReviewDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MovieReviewDTO>> Get(int Id)
        {
            logger.LogInformation("Getting Movie Review by id");

            var movieReview = await context.MovieReviews.FirstOrDefaultAsync(x => x.Id == Id);

            if (movieReview == null)
            {
                return NotFound();
            }

            return mapper.Map<MovieReviewDTO>(movieReview);
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Post([FromBody] MovieReviewCreationDTO movieReviewCreationDTO)
        {
            logger.LogInformation("Creating Movie Review");

            MovieReview movieReview = mapper.Map<MovieReview>(movieReviewCreationDTO);

            context.MovieReviews.Add(movieReview);
            await context.SaveChangesAsync();

            return NoContent();
        }


        [HttpPut("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Put(int id, [FromBody] MovieReviewDTO movieReviewDTO)
        {
            var movieReview = await context.MovieReviews.FirstOrDefaultAsync(x => x.Id == id);

            if (movieReview == null)
            {
                return NotFound();
            }

            movieReview = mapper.Map(movieReviewDTO, movieReview);
            await context.SaveChangesAsync();

            return NoContent();
        }



        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int id)
        {
            var movieReview = await context.MovieReviews.FirstOrDefaultAsync(x => x.Id == id);

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
