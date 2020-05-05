using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UsersForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                src.Photos.FirstOrDefault(p => p.IsMain).Url)) 
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => 
                src.DateOfBirth.CalculateAge())) ;
            CreateMap<User, UserForDetailDto>()
            .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                src.Photos.FirstOrDefault(p => p.IsMain).Url))  
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => 
                src.DateOfBirth.CalculateAge())) ;
            CreateMap<Photo, PhotosForDetailDto>() ;
            CreateMap<UserForUpdateDto, User>() ;
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
        }
    }
}