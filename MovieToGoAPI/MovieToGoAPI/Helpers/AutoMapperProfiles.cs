using AutoMapper;
using MovieToGoAPI.DTOs.Genres;
using MovieToGoAPI.DTOs.MovieReviews;
using MovieToGoAPI.DTOs.Movies;
using MovieToGoAPI.DTOs.Users;
using MovieToGoAPI.DTOs.WatchListItems;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Users
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<UserRegistrationDTO, User>().ReverseMap();

            // Genres
            CreateMap<GenreDTO, Genre>().ReverseMap();
            CreateMap<GenreCreationDTO, Genre>().ReverseMap();

            // Movies
            CreateMap<MovieDTO, Movie>().ReverseMap();
            CreateMap<MovieCreationDTO, Movie>().ReverseMap();

            // WatchListItem
            CreateMap<WatchListItemDTO, WatchListItem>().ReverseMap();

            // MovieReview
            CreateMap<MovieReviewDTO, MovieReview>().ReverseMap();
        }
    }
}
