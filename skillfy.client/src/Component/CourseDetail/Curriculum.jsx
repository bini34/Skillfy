import React, { useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import './Curriculum.css'
export default function Curriculum({ section }) {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };
  return (
    <div className="curriculum-section">
    <h2 onClick={toggleVisibility} className="section-title">
        {isVisible ? <KeyboardArrowUpOutlinedIcon/> : <KeyboardArrowDownOutlinedIcon/> }{section.title}</h2>
    {isVisible && (
      <ul>
        {section.lectures.map((lecture, index) => (
          <li key={index}>
            <div className="lecture-info">
              <span>{lecture.title}</span>
              <span>{lecture.duration}</span>
            </div>
            {lecture.preview && <span className="preview">Preview</span>}
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}
