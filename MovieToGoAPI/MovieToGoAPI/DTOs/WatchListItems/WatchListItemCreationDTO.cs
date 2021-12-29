using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.DTOs.WatchListItems
{
    public class WatchListItemCreationDTO
    {
        [Required(ErrorMessage = "The field {0} is required")]
        public int WatchListId { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        public int MovieId { get; set; }
    }
}
