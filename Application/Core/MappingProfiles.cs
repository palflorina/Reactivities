using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>(); //where are we going to mapp from, and where are we going to mapp to
        }
    }
}