using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        public int TheMovieDbId { get; set; }

        public double? VoteAverage { get; set; }

        public int? VoteCount { get; set; }

        /**********************************************************************************************************
        * References
        ***********************************************************************************************************/
        public virtual ICollection<WatchListItem> WatchListItems { get; set; }

        public virtual ICollection<MovieReview> MovieReviews { get; set; }
    }
}
