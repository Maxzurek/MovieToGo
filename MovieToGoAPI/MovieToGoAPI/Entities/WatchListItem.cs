using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace MovieToGoAPI.Entities
{
    public class WatchListItem
    {
        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        public int Id { get; set; }

        [DefaultValue(false)]
        public bool Watched { get; set; } = false;

        /**********************************************************************************************************
        * References
        ***********************************************************************************************************/
        [ForeignKey("WatchList")]
        public int WatchListId { get; set; }
        public virtual WatchList WatchList { get; set; }

        [ForeignKey("Movie")]
        public int MovieId { get; set; }
        public virtual Movie Movie { get; set; }
    }
}
    