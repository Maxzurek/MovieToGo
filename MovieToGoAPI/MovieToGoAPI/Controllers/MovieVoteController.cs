using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.DTOs.MovieVotes;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Controllers
{


    [Route("api/movievotes")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]

    public class MovieVoteController : Controller
    {
        private readonly ILogger<MovieVoteController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public MovieVoteController(ILogger<MovieVoteController> logger, ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }
        /// <summary>
        /// Get all TheMovieDb vote
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(List<MovieVoteDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<List<MovieVoteDTO>>> Get()
        {
            logger.LogInformation("Getting all movies");

            List<MovieVote> moviesVotes = await context.MovieVotes.ToListAsync();

            if (moviesVotes.Count == 0)
            {
                return NoContent();
            }

            return mapper.Map<List<MovieVoteDTO>>(moviesVotes);
        }

    }
}
