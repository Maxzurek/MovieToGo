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
            this.MovieReviewDTOs = new HashSet<MovieReviewDTO>();
        }

        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        public int Id { get; set; }

        public int TheMovieDbApiId { get; set; }

        public int? VoteAverage { get; set; }

        public int? VoteCount { get; set; }

        public ICollection<MovieReviewDTO> MovieReviewDTOs { get; set; }
    }
}
