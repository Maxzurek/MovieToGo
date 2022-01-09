using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieToGoAPI.Entities
{
    public class MovieVote
    {
        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        public int Id { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [Range(1,5)]
        public int Vote { get; set; }

        /**********************************************************************************************************
        * Refrences
        ***********************************************************************************************************/
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        [ForeignKey("Movie")]
        public int MovieId { get; set; }
        public virtual Movie Movie { get; set; }
    }
}
