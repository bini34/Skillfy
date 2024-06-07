﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Skillfy.Server.Data;
using Skillfy.Server.Dto;
using Skillfy.Server.Model;
using Skillfy.Server.Repo;
using Skillfy.Server.ViewModel;

namespace Skillfy.Server.service
{
    public class CourseSerivce : ICourseService
    {
        private readonly ICourseRepositary _courseRepositary;
        private readonly IchapterRepositery _chapterRepositery;
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IcatogryRepositary _icatogry;

        public CourseSerivce(IchapterRepositery ichapterRepositery, ICourseRepositary courseRepositary, ApplicationDbContext context, IWebHostEnvironment webHostEnvironment, IcatogryRepositary icatogry)
        {
            _chapterRepositery = ichapterRepositery;
            _context = context;
            _courseRepositary = courseRepositary;
            _webHostEnvironment = webHostEnvironment;
            _icatogry = icatogry;
        }

        public async Task<(bool Success, string Message, Course Course)> AddCourse(CourseCreateDto courseCreateDto,List<CreateChapterDto> chapterDtos, string uniqueFileName)
        {


            var catagoryid = await _icatogry.GetCatagoryIdByNameAsync(courseCreateDto.catagory);
            var imgpath = uniqueFileName;
            var course = new Course
            {
                Title = courseCreateDto.CourseName,
                UserId = courseCreateDto.userid,
                CatagoryId =  catagoryid,
                Price = courseCreateDto.price,
                Description = courseCreateDto.Description,
                ThumbnailImage = "/coursethumbline/{imgpath}"

            };

            var CourseId = await _courseRepositary.UploadCourse(course);
            if (CourseId < 0)
            {
                return (false, "Course Not created ", null);

            }
            if (chapterDtos == null)
            {
                return (false, "Chapter is null", null);
            }
            foreach (var chapters in chapterDtos)
            {

                var chap = new Chapter
                {
                    Chaptername = chapters.Name,
                    ChapterId = CourseId


                };
                await _chapterRepositery.AddChapterAsync(chap);

            }
            return (true, "Course and chapters created successfully", course);

        }
    }
}