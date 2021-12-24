using AutoMapper;
using MovieToGoAPI.DTOs;
using MovieToGoAPI.Entities;

namespace MovieToGoAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<UserRegistrationDTO, User>().ReverseMap();
            CreateMap<GenreDTO, Genre>().ReverseMap();
        }
    }
}
