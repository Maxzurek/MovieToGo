﻿using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MovieToGoAPI.DTOs.MovieVotes;
using MovieToGoAPI.Entities;
using MovieToGoAPI.Services;

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
        private readonly UserManager<User> userManager;
        private readonly AuthorizationService authorizationService;
        private readonly MovieService movieService;

        public MovieVotesController(
            ILogger<MovieVotesController> logger,
            ApplicationDbContext context,
            IMapper mapper,
            AuthorizationService authorizationService,
            UserManager<User> userManager, 
            MovieService movieService)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
            this.authorizationService = authorizationService;
            this.userManager = userManager;
            this.movieService = movieService;
        }

        /// <summary>
        /// Get all MovieVotes. Must be authorized (JWT bearer with policy = "IsAdmin").
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        [ProducesResponseType(typeof(List<MovieVoteDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<MovieVoteDTO>>> Get()
        {
            logger.LogInformation("Getting all MovieVotes");

            List<MovieVote> moviesVotes = await context.MovieVotes.ToListAsync();

            if (moviesVotes.Count == 0)
            {
                return NoContent();
            }

            return Ok(mapper.Map<List<MovieVoteDTO>>(moviesVotes));
        }

        /// <summary>
        /// Get MovieVote by ID. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpGet("{Id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(MovieVoteDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MovieVoteDTO>> Get(int Id)
        {
            logger.LogInformation("Getting a MovieVote by Id");

            MovieVote? movieVote = await context.MovieVotes.FirstOrDefaultAsync(x => x.Id == Id);

            if (movieVote == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<MovieVoteDTO>(movieVote));
        }

        /// <summary>
        /// Get a MovieVote by it's MovieId foreign key. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="MovieId"></param>
        /// <returns></returns>
        [HttpGet("movie/{MovieId:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(MovieVoteDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<MovieVoteDTO>> GetByMovieId(int MovieId)
        {
            logger.LogInformation("Getting a MovieVote by Id");

            User? user = await authorizationService.ValidateUserClaim(this, userManager);

            if (user == null)
            {
                return Unauthorized("Unauthorized. You must be logged in in order to post a movie vote");
            }

            MovieVote? movieVote = await context.MovieVotes.FirstOrDefaultAsync(x => x.MovieId == MovieId && x.UserId == user.Id);

            if (movieVote == null)
            {
                return NoContent();
            }

            return Ok(mapper.Map<MovieVoteDTO>(movieVote));
        }

        /// <summary>
        /// Create a MovieVote. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="movieVoteCreationDTO"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(MovieVoteDTO),StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<MovieVoteDTO>> Post([FromBody] MovieVoteCreationDTO movieVoteCreationDTO)
        {
            logger.LogInformation("Creating a MovieVote");

            User? user = await authorizationService.ValidateUserClaim(this, userManager);

            if(user == null)
            {
                return Unauthorized("Unauthorized. You must be logged in in order to post a movie vote");
            }

            MovieVote movieVote = mapper.Map<MovieVote>(movieVoteCreationDTO);
            movieVote.UserId = user.Id;

            MovieVote addedMovieVote = await movieService.RegisterMovieVote(context, movieVote);

            return Ok(mapper.Map<MovieVoteDTO>(addedMovieVote));
        }

        /// <summary>
        /// Update MovieVote by ID. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="MovieVoteDTO"></param>
        /// <returns></returns>
        [HttpPut("{Id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(MovieVoteDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MovieVoteDTO>> Put(int Id, [FromBody] MovieVoteUpdateDTO MovieVoteDTO)
        {
            logger.LogInformation("Updating a MovieVote");

            MovieVote? movieVote = await context.MovieVotes.FirstOrDefaultAsync(x => x.Id == Id);

            if (movieVote == null)
            {
                return NotFound();
            }

            movieVote = mapper.Map(MovieVoteDTO, movieVote);
            MovieVote addedMovieVote = await movieService.RegisterMovieVote(context, movieVote);

            return Ok(mapper.Map<MovieVoteDTO>(addedMovieVote));
        }


        /// <summary>
        /// Delete MovieVote by ID. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpDelete("{Id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int Id)
        {
            logger.LogInformation("Deleting a MovieVote");

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
