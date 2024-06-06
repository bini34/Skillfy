import './App.css';
import SignupPage from './Pages/SignupPage'
import SigninPage from './Pages/SigninPage'
import HomePage from './Pages/HomePage'
import CourseDetail from './Pages/CourseDetail';
import ShoppingCart from './Pages/ShoppingCart';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from './Component/ShoppingCart/Cart/Cart';
import CourseLearn from './Pages/CourseLearn';
import CreateCourse from './Component/InstructorAdmin/CourseForm'
import TestDataGrid from './Component/ui/TestDataGrid';
import CourseEditor from './Component/CourseEditor/CourseEditor';
 function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage/>
        },
        {
            path: '/api/Account/signin',
            element: <SigninPage/>
        },
        {
            path: '/api/account/registor',
            element: <SignupPage/>
        },
        {
            path: '/coursedetail',
            element: <CourseDetail/>
        },
        {
            path: '/cart',
            element: <Cart/>
        },
        {
            path: '/course/learn',
            element: <CourseLearn/>
        },
        {
            path:'/data',
            element: <CourseEditor/>
            //element: <CreateCourse/>
            //element: <TestDataGrid/>
        }
    ])
    
    return <RouterProvider router={router}/>;

}
export default App;
