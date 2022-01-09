using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MovieToGoAPI.DTOs.MovieVotes;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Controllers
{
    [Route("api/movievotes")]
    [ApiController]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]

    public class MovieVotesController : Controller
    {
        private readonly ILogger<MovieVotesController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public MovieVotesController(ILogger<MovieVotesController> logger, ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        /// <summary>
        /// get all movieVotes
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

        /// <summary>
        /// Get movieVote by ID
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet("{Id:int}")]
        [ProducesResponseType(typeof(MovieVoteDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<MovieVoteDTO>> Get(int Id)
        {
            logger.LogInformation("Getting vote by Id");

            MovieVote? movieVote = await context.MovieVotes.FirstOrDefaultAsync(x => x.Id == Id);

            if (movieVote == null)
            {
                return NotFound();
            }

            return mapper.Map<MovieVoteDTO>(movieVote);
        }

        /// <summary>
        /// Create movieVote
        /// </summary>
        /// <param name="movieVoteCreationDTO"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(typeof(MovieVoteDTO),StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<MovieVoteDTO>> Post([FromBody] MovieVoteCreationDTO movieVoteCreationDTO)
        {
            logger.LogInformation("Creating a Vote");

            MovieVote movieVote = mapper.Map<MovieVote>(movieVoteCreationDTO);

            EntityEntry<MovieVote> entityEntry = context.MovieVotes.Add(movieVote);
            await context.SaveChangesAsync();

            await entityEntry.Reference(x => x.User).LoadAsync();

            return Ok(mapper.Map<MovieVoteDTO>(entityEntry.Entity));
        }

        /// <summary>
        /// Update movieVote by ID
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="MovieVoteDTO"></param>
        /// <returns></returns>
        [HttpPut("{Id:int}")]
        [ProducesResponseType(typeof(MovieVoteDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult<MovieVoteDTO>> Put(int Id, [FromBody] MovieVoteUpdateDTO MovieVoteDTO)
        {
            logger.LogInformation("Updating a Vote");

            MovieVote? movieVote = await context.MovieVotes.FirstOrDefaultAsync(x => x.Id == Id);

            if (movieVote == null)
            {
                return NotFound();
            }

            movieVote = mapper.Map(MovieVoteDTO, movieVote);
            await context.SaveChangesAsync();

            return Ok(mapper.Map<MovieVoteDTO>(movieVote));
        }


        /// <summary>
        /// Delete movieVote by ID
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpDelete("{Id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult> Delete(int Id)
        {
            logger.LogInformation("Deleting a Vote");

            MovieVote? movieVote = await context.MovieVotes.FirstOrDefaultAsync(x => x.Id == Id);

            if (movieVote == null)
            {
                return NotFound();
            }

            context.MovieVotes.Remove(movieVote);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
