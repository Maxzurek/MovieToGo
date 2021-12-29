using MovieToGoAPI.DTOs.WatchListItems;

namespace MovieToGoAPI.DTOs.WatchLists
{
    public class WatchListDTO
    {
        /**********************************************************************************************************
        * Constructor
        ***********************************************************************************************************/
        public WatchListDTO()
        {
            this.WatchListItemDTOs = new HashSet<WatchListItemDTO>();
        }

        /**********************************************************************************************************
        * Properties
        ***********************************************************************************************************/
        public int Id { get; set; }

        public string Name { get; set; }

        //TODO Create UserDTO
        //public UserDTO UserDTO { get; set; }

        public ICollection<WatchListItemDTO> WatchListItemDTOs { get; set; }
    }
}
