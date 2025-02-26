﻿using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MovieToGoAPI.DTOs.MovieReviews;
using MovieToGoAPI.Entities;
using MovieToGoAPI.Models;
using MovieToGoAPI.Services;

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
        private readonly UserManager<User> userManager;
        private readonly AuthorizationService authorizationService;

        public MovieReviewsController(
            ILogger<MovieReviewsController> logger,
            ApplicationDbContext context,
            IMapper mapper,
            AuthorizationService authorizationService,
            UserManager<User> userManager)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
            this.authorizationService = authorizationService;
            this.userManager = userManager;
        }

        /// <summary>
        /// Get all movie Reviews. Must be authorized (JWT bearer with policy = "IsAdmin").
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        [ProducesResponseType(typeof(List<MovieReviewDTO>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<List<MovieReviewDTO>>> Get()
        {
            logger.LogInformation("Getting all Movie Reviews");

            List<MovieReview> movieReviews = await context.MovieReviews.ToListAsync();

            if (movieReviews.Count == 0)
            {
                return NoContent();
            }

            return Ok(mapper.Map<List<MovieReviewDTO>>(movieReviews));
        }


        /// <summary>
        /// Get Movie Review by ID.
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

            return Ok(mapper.Map<MovieReviewDTO>(movieReview));
        }


        /// <summary>
        /// Get all movie Reviews by Movie Id.
        /// </summary>
        /// <param name="MovieId"></param>
        /// <returns></returns>
        [HttpGet("movie/{MovieId:int}")]
        [ProducesResponseType(typeof(List<MovieReviewDTO>), StatusCodes.Status200OK)]
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

            return Ok(mapper.Map<List<MovieReviewDTO>>(movieReviews));
        }

        /// <summary>
        /// Create Movie Review. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="movieReviewCreationDTO"></param>
        /// <returns></returns>
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(MovieReviewDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(List<ErrorMessage>), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult<MovieReviewDTO>> Post([FromBody] MovieReviewCreationDTO movieReviewCreationDTO)
        {
            logger.LogInformation("Creating Movie Review");

            User? user = await authorizationService.ValidateUserClaim(this, userManager);

            if (user == null)
            {
                return Unauthorized("Unauthorized. You must be logged in in order to post a movie review");
            }

            MovieReview? movieReview = mapper.Map<MovieReview>(movieReviewCreationDTO);
            movieReview.UserID = user.Id;

            EntityEntry<MovieReview> entityEntry = context.MovieReviews.Add(movieReview);

            await context.SaveChangesAsync();

            await entityEntry.Reference(x => x.User).LoadAsync();

            return Ok(mapper.Map<MovieReviewDTO>(entityEntry.Entity));
        }


        /// <summary>
        /// Update Movie Review by ID. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="id"></param>
        /// <param name="movieReviewUpdateDTO"></param>
        /// <returns></returns>
        [HttpPut("{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(typeof(MovieReviewDTO), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MovieReviewDTO>> Put(int id, [FromBody] MovieReviewUpdateDTO movieReviewUpdateDTO)
        {
            logger.LogInformation("Updating a Movie Review");

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
        /// Delete movie Review by ID. Must be authorized (JWT bearer).
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id:int}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int id)
        {
            logger.LogInformation("Deleting a Movie Review");

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
