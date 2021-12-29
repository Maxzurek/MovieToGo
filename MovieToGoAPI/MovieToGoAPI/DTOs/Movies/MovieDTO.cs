using MovieToGoAPI.Entities;

namespace MovieToGoAPI.DTOs.Movies
{
    public class MovieDTO
    {
        public MovieDTO()
        {
            MovieReviews = new HashSet<MovieReview>();
        }

        public int Id { get; set; }

        public int TheMovieDbApiId { get; set; }

        public int? VoteAverage { get; set; }

        public int? VoteCount { get; set; }

        public ICollection<MovieReview> MovieReviews { get; set; }
    }
}
