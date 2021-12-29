using MovieToGoAPI.DTOs.Movies;
using MovieToGoAPI.DTOs.WatchLists;

namespace MovieToGoAPI.DTOs.WatchListItems
{
    public class WatchListItemDTO
    {
        public int Id { get; set; }

        public bool Watched { get; set; }

        public WatchListDTO WatchListDTO { get; set; }

        public MovieDTO MovieDTO { get; set; }
    }
}
