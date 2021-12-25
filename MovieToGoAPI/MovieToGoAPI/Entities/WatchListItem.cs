using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.Entities
{
    public class WatchListItem
    {
        public int Id { get; set; }

        [DefaultValue(false)]
        public bool Watched { get; set; }

        // References
        public WatchList WatchList { get; set; }
    }
}
    