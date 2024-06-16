import React from 'react';

const ChapterCustomization = () => {
    return (
        <>
            <div className="courseCreate-LeftMainContainer-CourseTitle">
                <h3>Chapter Title Title</h3>
                <input type="text" placeholder="Course Title" id="title" onChange={handleInputChange} />
            </div>
        </>

    );
};

export default ChapterCustomization;