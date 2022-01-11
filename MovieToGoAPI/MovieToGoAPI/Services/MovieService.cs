using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Services
{
    public class MovieService
    {
        /// <summary>
        /// Asyncronously attempt the register a movie vote to the database.
        /// Adjust the movie vote average.
        /// </summary>
        /// <param name="context"></param>
        /// <param name="newMovieVote"></param>
        /// <returns>The MovieVote entity created</returns>
        public async Task<MovieVote> RegisterMovieVote(ApplicationDbContext context, MovieVote newMovieVote)
        {
            MovieVote? existingMovieVote = await context.MovieVotes.FirstOrDefaultAsync(x => x.UserId == newMovieVote.UserId && x.MovieId == newMovieVote.MovieId);
            EntityEntry<MovieVote> entityEntry;

            if (existingMovieVote != null) // User already rated the movie, don't count the vote
            {
                int tempExistingMovieVote = existingMovieVote.Vote;

                existingMovieVote.Vote = newMovieVote.Vote;
                entityEntry = context.MovieVotes.Update(existingMovieVote);
                await context.SaveChangesAsync();

                return entityEntry.Entity;
            }
            else // Add the new movie vote to the database
            {
                entityEntry = context.MovieVotes.Add(newMovieVote);
            }

            // Now update the movie average vote
            Movie? movie = await context.Movies.FirstOrDefaultAsync(x => x.Id == newMovieVote.MovieId);

            if(movie != null)
            {
                double? voteAverage = movie.VoteAverage.HasValue ? movie.VoteAverage : 0;
                int? voteCount = movie.VoteCount.HasValue ? movie.VoteCount : 0;

                if(voteAverage.HasValue && voteCount.HasValue)
                {
                    movie.VoteAverage = CalculateNewVoteAverage(voteAverage.Value, voteCount.Value, newMovieVote.Vote);
                    movie.VoteCount = movie.VoteCount.HasValue ? movie.VoteCount + 1 : 1;
                }
            }

            await context.SaveChangesAsync();

            return entityEntry.Entity;
        }

        private double? CalculateNewVoteAverage(double voteAverage, int voteCount, int newVote)
        {
            double newVoteAverage = ((voteAverage * (double)voteCount) + ((double)newVote * 2.0)) / ((double)voteCount + 1.0);

            return Math.Round(newVoteAverage, 1);
        }
    }
}
