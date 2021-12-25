using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.DTOs.Genres
{
    public class GenreCreationDTO
    {
        [Required(ErrorMessage = "The field {0} is required")]
        [StringLength(50)]
        public string Designation { get; set; }
    }
}
