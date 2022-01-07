using MovieToGoAPI.DTOs.Movies;
using MovieToGoAPI.DTOs.WatchLists;

namespace MovieToGoAPI.DTOs.WatchListItems
{
    public class WatchListItemDTO
    {
        public int Id { get; set; }

        public bool Watched { get; set; }

        public MovieDTO Movie { get; set; }
    }
}
