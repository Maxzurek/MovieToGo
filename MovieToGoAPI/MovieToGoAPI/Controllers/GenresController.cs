using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.DTOs.Genres  ;
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
        public async Task<ActionResult<List<GenreDTO>>> Get()
        {
            logger.LogInformation("Getting all genres");

            var genres = await context.Genres.ToListAsync();

            return mapper.Map<List<GenreDTO>>(genres);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<GenreDTO>> Get(int Id)
        {
            logger.LogInformation("Getting genre by id");

            var genre = await context.Genres.FirstOrDefaultAsync(x => x.GenreId == Id);

            if (genre == null)
            {
                return NotFound();
            }

            return mapper.Map<GenreDTO>(genre);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenreCreationDTO genreCreationDTO)
        {
            Genre genre = mapper.Map<Genre>(genreCreationDTO);
            context.Genres.Add(genre);
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] GenreCreationDTO genreCreationDTO)
        {
            var genre = await context.Genres.FirstOrDefaultAsync(x => x.GenreId == id);

            if(genre == null)
            {
                return NotFound();
            }

            genre = mapper.Map<Genre>(genreCreationDTO);
            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var genre = await context.Genres.FirstOrDefaultAsync(x => x.GenreId == id);

            if(genre == null)
            {
                return NotFound();
            }

            context.Genres.Remove(genre);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
