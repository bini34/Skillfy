import React, { useEffect, useState } from 'react';
import DataGrid from '../ui/DataGrid';
import authService from '../../Services/authService';

export default function InstructorCoursesDatagrid() {
    const [courses, setCourses] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setIsAuthenticated(true);
          setUser(currentUser);
        }
    }, []);

    useEffect(() => {
        async function fetchCourses() {
            if (user) {
                try {
                    const response = await fetch(`https://localhost:7182/api/teacher/getteachercourse${user.id}`);
                    const result = await response.json();
                    console.log('Courses:', result);
                    const formattedData = result.$values.map((course, index) => ({
                        number: index + 1,
                        name: course
                    }));
                    setCourses(formattedData);
                } catch (error) {
                    console.error('Error fetching courses:', error);
                }
            }
        }
        fetchCourses();
    }, [user]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'No.',
                accessor: 'number', // accessor for row number
            },
            {
                Header: 'Course Name',
                accessor: 'name', // accessor is the "key" in the data
            },
        ],
        []
    );

    return (
        <div>
            <h1>Instructor Courses Data Grid</h1>
            <DataGrid columns={columns} data={courses} />
        </div>
    );
}
