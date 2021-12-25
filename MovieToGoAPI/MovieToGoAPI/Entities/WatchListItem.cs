using System.ComponentModel;

namespace MovieToGoAPI.Entities
{
    public class WatchListItem
    {
        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        public int Id { get; set; }

        [DefaultValue(false)]
        public bool Watched { get; set; }

        /**********************************************************************************************************
        * References
        ***********************************************************************************************************/
        public WatchList WatchList { get; set; }

        public Movie Movie { get; set; }
    }
}
    