using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Controllers
{
    [Route("api/genre")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public GenreController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Genre>>> Get()
        {
            return await dbContext.Genres.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Genre genre)
        {
            dbContext.Genres.Add(genre);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
