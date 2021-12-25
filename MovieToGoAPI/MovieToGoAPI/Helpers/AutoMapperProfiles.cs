using AutoMapper;
using MovieToGoAPI.DTOs.Genres;
using MovieToGoAPI.DTOs.Users;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Users
            CreateMap<UserRegistrationDTO, User>().ReverseMap();

            //Genres
            CreateMap<GenreDTO, Genre>().ReverseMap();
            CreateMap<GenreCreationDTO, Genre>().ReverseMap();    
        }
    }
}
