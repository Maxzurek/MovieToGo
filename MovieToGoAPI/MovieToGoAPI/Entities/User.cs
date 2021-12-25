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
        }

        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        [Required]
        [StringLength(150)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(150)]
        public string LastName { get; set; }


        /**********************************************************************************************************
        * References
        ***********************************************************************************************************/
        public ICollection<WatchList> WatchLists { get; set; }
    }
}
