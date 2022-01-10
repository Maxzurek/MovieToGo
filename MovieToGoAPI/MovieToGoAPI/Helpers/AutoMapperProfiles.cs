using AutoMapper;
using MovieToGoAPI.DTOs.MovieReviews;
using MovieToGoAPI.DTOs.Movies;
using MovieToGoAPI.DTOs.MovieVotes;
using MovieToGoAPI.DTOs.Users;
using MovieToGoAPI.DTOs.WatchListItems;
using MovieToGoAPI.DTOs.WatchLists;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Users
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<UserCreationDTO, User>().ReverseMap();

            // Movies
            CreateMap<MovieDTO, Movie>().ReverseMap();
            CreateMap<MovieCreationDTO, Movie>().ReverseMap();
            CreateMap<MovieUpdateDTO, Movie>().ReverseMap();

            // Watchlist
            CreateMap<WatchListDTO, WatchList>().ReverseMap();
            CreateMap<WatchListCreationDTO, WatchList>().ReverseMap();
            CreateMap<WatchListUpdateDTO, WatchList>().ReverseMap();

            // WatchListItem
            CreateMap<WatchListItemDTO, WatchListItem>().ReverseMap();
            CreateMap<WatchListItemCreationDTO, WatchListItem>().ReverseMap();
            CreateMap<WatchListItemUpdateDTO, WatchListItem>().ReverseMap();

            // MovieReview
            CreateMap<MovieReviewDTO, MovieReview>().ReverseMap();
            CreateMap<MovieReviewCreationDTO, MovieReview>().ReverseMap();
            CreateMap<MovieReviewUpdateDTO, MovieReview>().ReverseMap();

            // MovieVotes
            CreateMap<MovieVoteDTO, MovieVote>().ReverseMap();
            CreateMap<MovieVoteCreationDTO, MovieVote>().ReverseMap();
            CreateMap<MovieVoteUpdateDTO, MovieVote>().ReverseMap();
        }
    }
}
