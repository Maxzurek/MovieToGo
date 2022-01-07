using MovieToGoAPI.DTOs.Movies;
using MovieToGoAPI.DTOs.Users;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.DTOs.MovieReviews
{
    public class MovieReviewDTO
    {
        public int Id { get; set; }

        public string Body { get; set; }

        public MovieDTO Movie { get; set; }

        public UserDTO User { get; set; }
    }
}
