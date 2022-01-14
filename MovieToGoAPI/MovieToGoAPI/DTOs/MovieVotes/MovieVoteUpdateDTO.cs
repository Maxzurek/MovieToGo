using System.ComponentModel.DataAnnotations;

namespace MovieToGoAPI.DTOs.MovieVotes
{
    public class MovieVoteUpdateDTO
    {
        [Required(ErrorMessage = "The field {0} is required")]
        [Range(1, 5)]
        public int Vote{ get; set; }
    }
}
