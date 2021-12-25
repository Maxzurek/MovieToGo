using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.Entities
{
    public class Movie
    {
        /**********************************************************************************************************
        * Constructor
        ***********************************************************************************************************/
        public Movie()
        {
            this.WatchListItems = new HashSet<WatchListItem>();
            this.MovieReviews = new HashSet<MovieReview>();
        }

        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        public int Id { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public int TheMovieDbApiId { get; set; }

        public int? VoteAverage { get; set; }

        public int? VoteCount { get; set; }

        /**********************************************************************************************************
        * References
        ***********************************************************************************************************/
        public ICollection<WatchListItem> WatchListItems { get; set; }

        public ICollection<MovieReview> MovieReviews { get; set; }
    }
}
