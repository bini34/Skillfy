import React, { useEffect, useState } from 'react';
import DataGrid from '../ui/DataGrid';
import useAuthStore from '../../store/authStore';
import { toArray } from '../../lib/utils';

export default function InstructorCoursesDatagrid() {
    const [courses, setCourses] = useState([]);
    const user = useAuthStore((s) => s.user);

    useEffect(() => {
        async function fetchCourses() {
            if (user?.Id) {
                try {
                    const response = await fetch(`https://localhost:7182/api/teacher/getteachercourse${user.Id}`);
                    const result = await response.json();
                    const arr = toArray(result);
                    const formattedData = arr.map((course, index) => ({
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
    }, [user?.Id]);

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
