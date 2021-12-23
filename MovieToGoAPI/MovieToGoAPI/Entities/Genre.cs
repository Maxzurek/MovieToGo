using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.Entities
{
    public class Genre
    {
        public int GenreId { get; set; }

        public string Designation { get; set; }
    }
}
