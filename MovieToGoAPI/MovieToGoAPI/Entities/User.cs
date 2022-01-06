using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.Entities
{
    public class User : IdentityUser
    {
        /**********************************************************************************************************
        * Constructor
        ***********************************************************************************************************/
        public User() : base()
        {
            this.WatchLists = new HashSet<WatchList>();
            this.MovieReviews = new HashSet<MovieReview>();
            this.MovieVotes = new HashSet<MovieVote>();
        }

        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        [StringLength(150)]
        public string FirstName { get; set; }

        [StringLength(150)]
        public string LastName { get; set; }


        /**********************************************************************************************************
        * References
        ***********************************************************************************************************/
        public virtual ICollection<WatchList> WatchLists { get; set; }

        public virtual ICollection<MovieReview> MovieReviews { get; set; }

        public virtual ICollection<MovieVote> MovieVotes { get; set; }
    }
}
