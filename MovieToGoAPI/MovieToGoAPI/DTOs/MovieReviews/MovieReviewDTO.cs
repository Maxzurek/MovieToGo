using MovieToGoAPI.DTOs.Movies;
using MovieToGoAPI.DTOs.Users;

namespace MovieToGoAPI.DTOs.MovieReviews
{
    public class MovieReviewDTO
    {
        public int Id { get; set; }

        public string Body { get; set; }

        public MovieDTO MovieDTO { get; set; }

        public UserDTO UserDTO { get; set; }
    }
}
