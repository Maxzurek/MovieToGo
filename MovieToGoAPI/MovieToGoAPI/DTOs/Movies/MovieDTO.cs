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
            this.WatchListItemsDTOs = new HashSet<WatchListItemDTO>();
            this.MovieReviewsDTOs = new HashSet<MovieReviewDTO>();
        }

        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        public int Id { get; set; }

        public int TheMovieDbApiId { get; set; }

        public int? VoteAverage { get; set; }

        public int? VoteCount { get; set; }

        public ICollection<WatchListItemDTO> WatchListItemsDTOs { get; set; }

        public ICollection<MovieReviewDTO> MovieReviewsDTOs { get; set; }
    }
}
