using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.DTOs.WatchLists
{
    public class WatchListCreationDTO
    {
        [Required(ErrorMessage = "The field {0} is required")]
        [StringLength(100)]
        public string Name { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public string UserId { get; set; }
    }
}
