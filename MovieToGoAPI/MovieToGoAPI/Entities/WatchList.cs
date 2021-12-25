using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.Entities
{
    public class WatchList
    {
        public WatchList()
        {
            this.WatchListItems = new HashSet<WatchListItem>();
        }

        public int Id { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [StringLength(100)]
        public string Name { get; set; }

        // User reference
        public User User { get; set; }

        public ICollection<WatchListItem> WatchListItems { get; set; }
    }
}
