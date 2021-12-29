using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.Entities
{
    public class MovieVote
    {
        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        public int Id { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [Range(-1,1)]
        public int Vote { get; set; }

        /**********************************************************************************************************
        * Refrences
        ***********************************************************************************************************/
        public User User { get; set; }

        public Movie Movie { get; set; }
    }
}
