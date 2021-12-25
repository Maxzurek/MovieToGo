using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.Entities
{
    public class WatchList
    {
        /**********************************************************************************************************
        * Constructor
        ***********************************************************************************************************/
        public WatchList()
        {
            this.WatchListItems = new HashSet<WatchListItem>();
        }

        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        public int Id { get; set; }

        [Required(ErrorMessage = "The field {0} is required")]
        [StringLength(100)]
        public string Name { get; set; }

        /**********************************************************************************************************
        * References
        ***********************************************************************************************************/
        public User User { get; set; }

        public ICollection<WatchListItem> WatchListItems { get; set; }
    }
}
