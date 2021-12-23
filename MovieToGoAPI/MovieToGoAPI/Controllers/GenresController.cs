using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Controllers
{
    [Route("api/genres")]
    [ApiController]
    public class GenresController : ControllerBase
    {
        private readonly ILogger<GenresController> logger;
        private readonly ApplicationDbContext context;

        public GenresController(ILogger<GenresController> logger, ApplicationDbContext context)
        {
            this.logger = logger;
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Genre>>> Get()
        {
            return await context.Genres.ToListAsync();
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<List<Genre>>> Get(int Id)
        {
            return await context.Genres.Where( genre =>genre.GenreId == Id).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Genre genre)
        {
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
