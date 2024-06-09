import React, { useState } from 'react'
import './CourseChapter.css'
import 'react-quill/dist/quill.snow.css'; // import styles
import TextField from '@mui/material/TextField';
import ReactQuill from 'react-quill';

export default function CourseChapter() {
    const [value, setValue] = useState('');

  return (
    <div className='courseChapter'>
        <div className='chapter-title'>
        <TextField id="standard-basic" label="Standard" variant="standard" />

        </div>

        <div className='chapter-discription'>
            <h3>Chapter Discription</h3>
        <ReactQuill value={value} onChange={setValue} />

        </div>
    </div>
  );
}
