using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.Filters;

namespace MovieToGoAPI
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddControllers(options =>
            {
                options.Filters.Add(typeof(ExceptionFilter));
            });

            services.AddEndpointsApiExplorer();

            services.AddSwaggerGen();

            services.AddCors(options =>
            {
                string frontEndUrl = Configuration.GetValue<string>("FrontEnd_Url");
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(frontEndUrl).AllowAnyMethod().AllowAnyHeader();
                });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Configure the HTTP request pipeline.
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
