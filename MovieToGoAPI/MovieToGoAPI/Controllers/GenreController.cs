using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Controllers
{
    [Route("api/genre")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> logger;
        private readonly ApplicationDbContext dbContext;

        public GenreController(ILogger<WeatherForecastController> logger, ApplicationDbContext dbContext)
        {
            this.logger = logger;
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Genre>>> Get()
        {
            logger.LogInformation("Getting all the genres");

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
