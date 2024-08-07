﻿using Skillfy.Server.Model;

namespace Skillfy.Server.Dto
{
    public class CourseDetailsDto
    {
        public string coursename {  get; set; }
        public decimal price { get; set; }       
        public string description { get; set; }

        public string[] chapter {  get; set; }

        public string[] lessonname {  get; set; }

        public double rating { get; set; }

        public string Bio {  get; set; }

        public int TotalLessons {  get; set; }
        public string about { get; set; }
        public string course_audience { get; set; }

        public string teacherprofile {  get; set; }

        public Review[] review {  get; set; }
    }
}
