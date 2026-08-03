import React, {useState, useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import './categoriesPage.css'
import Header from '../Component/Header/Header'
import Footer from '../Component/Footer/Footer'
import CourseCard from '../Component/ui/CourseCard'


export default function CategoriesPage() {
    const [courseData, setCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { category } = useParams();

    const categoryname = category || location.state?.topic || '';

    useEffect(() => {
        if (!categoryname) {
            setLoading(false);
            return;
        }
        const fetchCourses = async () => {
          setLoading(true);
          try {
            const response = await axios.get(`https://localhost:7182/api/course/coursebycatagory${categoryname}`);
            const data = response.data?.$values || response.data || [];
            setCourseData(Array.isArray(data) ? data : []);
          } catch (error) {
            console.error('Error fetching course data:', error);
            setCourseData([]);
          } finally {
            setLoading(false);
          }
        };

        fetchCourses();
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
