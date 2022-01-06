using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual User User { get; set; }

        public virtual ICollection<WatchListItem> WatchListItems { get; set; }
    }
}
