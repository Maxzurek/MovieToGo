using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.DTOs.Movies
{
    public class MovieCreationDTO
    {
        [Required(ErrorMessage = "The field {0} is required")]

        public int TheMovieDbApiId { get; set; }
    }
}
