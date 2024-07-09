import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './categoriesPage.css'
import Header from '../Component/Header/Header'
import Footer from '../Component/Footer/Footer'


export default function CategoriesPage() {
    const [courseData, setCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryname, setCategoryName] = useState('');
    const location = useLocation();

    useEffect(() => {
        console.log('Type of categoryname ID from location state:', location.state);
        setCategoryName(location.state.topic);
    }, [location.state]);

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const response = await axios.get(`https://localhost:7182/api/course/coursebycatagory${categoryname}`);
            console.log('Response:', response.data.$values);
            setCourseData(response.data.$values);
          } catch (error) {
            console.error('Error fetching course data:', error);
          } finally {
            setLoading(false);
          }
        };
    
        if (categoryname) {
          fetchCourses();
        }
      }, [categoryname]);
    return (
        <>
            <Header color="black"/>
            <div className='categoriesContainer'>
                <div className="categoriesMainContainer">
                    <div className="categoriesMainContainer-header">
                        <h1>{categoryname} courses</h1>
                    </div>
                    <div className="categoriesMainContainer-main">
                    {loading ? (
                        <div className="loading">
                            <CircularProgress />
                        </div>
                        ) : courseData.length > 0 ? (
                        courseData.map((course, index) => (
                            <CourseCard key={index} {...course} />
                        ))
                        ) : (
                        <div>
                        
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
