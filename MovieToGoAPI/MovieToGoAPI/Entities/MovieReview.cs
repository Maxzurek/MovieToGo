using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.Entities
{
    public class MovieReview
    {
        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        public int Id { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public string Body { get; set; }

        /**********************************************************************************************************
        * References
        ***********************************************************************************************************/
        public Movie Movie { get; set; }

        public User User { get; set; }
    }
}
