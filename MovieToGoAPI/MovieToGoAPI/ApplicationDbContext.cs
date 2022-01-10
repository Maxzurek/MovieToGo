using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MovieToGoAPI.Entities;
using System.Diagnostics.CodeAnalysis;

namespace MovieToGoAPI
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser, IdentityRole, string>
    {
        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<User> Users { get; set; }

        public DbSet<WatchList> WatchLists { get; set; }

        public DbSet<WatchListItem> WatchListItems { get; set; }

        public DbSet<Movie> Movies { get; set; }

        public DbSet<MovieReview> MovieReviews { get; set; }

        public DbSet<MovieVote> MovieVotes { get; set; }
    }
}
