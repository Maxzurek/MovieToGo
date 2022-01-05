using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieToGoAPI.Entities
{
    public class MovieReview
    {
        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        public int Id { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [StringLength(500)]
        public string Body { get; set; }

        /**********************************************************************************************************
        * References
        ***********************************************************************************************************/
        [ForeignKey("Movie")]
        public int MovieId { get; set; }

        public Movie Movie { get; set; }

        [ForeignKey("User")]
        public string UserID { get; set; }

        public User User { get; set; }
    }
}
