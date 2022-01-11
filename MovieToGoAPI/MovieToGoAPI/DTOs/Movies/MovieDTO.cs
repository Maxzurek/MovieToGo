using MovieToGoAPI.DTOs.MovieReviews;
using MovieToGoAPI.DTOs.WatchListItems;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.DTOs.Movies
{
    public class MovieDTO
    {
        /**********************************************************************************************************
        * Constructor
        ***********************************************************************************************************/
        public MovieDTO()
        {
            this.MovieReviews = new HashSet<MovieReviewDTO>();
        }

        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        public int Id { get; set; }

        public int TheMovieDbId { get; set; }

        public double? VoteAverage { get; set; }

        public int? VoteCount { get; set; }

        public ICollection<MovieReviewDTO> MovieReviews { get; set; }
    }
}
