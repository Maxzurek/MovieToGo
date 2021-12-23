using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.Entities
{
    public class Genre
    {
        public int GenreId { get; set; }

        [Required(ErrorMessage ="The field {0} is required")]
        [StringLength(50)]
        public string Designation { get; set; }
    }
}
