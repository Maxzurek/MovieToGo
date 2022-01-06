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
        [ForeignKey("User")]
        public string UserID { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("Movie")]
        public int MovieId { get; set; }
        public virtual Movie Movie { get; set; }

    }
}
