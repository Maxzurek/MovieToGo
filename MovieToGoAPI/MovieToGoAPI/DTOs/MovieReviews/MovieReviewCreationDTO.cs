using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.DTOs.MovieReviews
{
    public class MovieReviewCreationDTO
    {
        [Required(ErrorMessage = "The field {0} is required")]
        [StringLength(500)]
        public string Body { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public int MovieId { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public string UserId { get; set; }
    }
}
