import './App.css';

import SignupPage from './Pages/SignupPage'
import SigninPage from './Pages/SigninPage'

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './Pages/HomePage'
import CourseDetail from './Pages/CourseDetail';

 function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage/>
        },
        {
            path: '/Signin',
            element: <SigninPage/>
        },
        {
            path: '/Signup',
            element: <SignupPage/>
        },
        {
            path: '/CourseDetail',
            element: <CourseDetail/>
        }

    ])
    
    return <RouterProvider router={router}/>;

}
export default App;
