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
        /// get all MovieVotes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(List<MovieVoteDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<List<MovieVoteDTO>>> Get()
        {
            logger.LogInformation("Getting all movies");

            List<MovieVote> moviesVotes = await context.MovieVotes.Include(x => x.User).Include(x => x.Movie).ToListAsync();

            if (moviesVotes.Count == 0)
            {
                return NoContent();
            }

            return mapper.Map<List<MovieVoteDTO>>(moviesVotes);
        }

        /// <summary>
        /// Get MovieVote by ID
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet("{Id:int}")]
        [ProducesResponseType(typeof(MovieVoteDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<ActionResult<List<MovieVoteDTO>>> Get(int Id)
        {
            logger.LogInformation("Getting vote by Id");

            MovieVote? movieVote = await context.MovieVotes.Include(x => x.User).Include(x => x.Movie).FirstOrDefaultAsync(x => x.Id == Id);
            
            if(movieVote == null)
            {
                return NotFound();

            }

            return mapper.Map<List<MovieVoteDTO>>(movieVote);
            
           
        }

        /// <summary>
        /// Create MovieVote
        /// </summary>
        /// <param name="movieVoteCreationDTO"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]

        public async Task<ActionResult> Post([FromBody] MovieVoteCreationDTO movieVoteCreationDTO)
        {
            logger.LogInformation("Creating a Vote");

            MovieVote movieVote = mapper.Map<MovieVote>(movieVoteCreationDTO);

            context.MovieVotes.Add(movieVote);

            await context.SaveChangesAsync();

            return NoContent();
        }

        /// <summary>
        /// Update vote by VoteId
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="MovieVoteDTO"></param>
        /// <returns></returns>
        [HttpPut("{Id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult> Put(int Id, [FromBody] MovieVoteUpdateDTO MovieVoteDTO)
        {
            MovieVote? movieVote = await context.MovieVotes.FirstOrDefaultAsync(x => x.Id == Id);

           if(movieVote == null)
           {
                return NotFound();
           }

            movieVote = mapper.Map(MovieVoteDTO, movieVote);
            await context.SaveChangesAsync();

            return NoContent();
        }


        /// <summary>
        /// Delete Vote by VoteId
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpDelete("{Id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public async Task<ActionResult> Delete(int Id)
        {
            MovieVote? movieVote = await context.MovieVotes.FirstOrDefaultAsync(x => x.Id == Id);

            if(movieVote == null)
            {
                return NotFound();
            }
            
            context.MovieVotes.Remove(movieVote);
            await context.SaveChangesAsync();

            return NoContent();
        }





    }
}
