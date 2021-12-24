using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.DTOs;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Controllers
{
    [Route("api/genres")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly ILogger<GenresController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public GenresController(ILogger<GenresController> logger, ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Genre>>> Get()
        {
            return await context.Genres.ToListAsync();
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<List<GenreDTO>>> Get(int Id)
        {
            logger.LogInformation("Getting all genres");

            List<Genre> genres = await context.Genres.Where( genre =>genre.GenreId == Id).ToListAsync();

            return mapper.Map<List<GenreDTO>>(genres);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenreDTO genreDTO)
        {
            Genre genre = mapper.Map<Genre>(genreDTO);
            context.Genres.Add(genre);
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] Genre genre)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete([FromBody] Genre genre)
        {
            throw new NotImplementedException();
        }
    }
}
