using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.Entities;
using System.Diagnostics.CodeAnalysis;

namespace MovieToGoAPI
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {

        }

        public DbSet<Genre> Genres { get; set; }
    }
}
