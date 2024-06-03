import './App.css';
import SignupPage from './Pages/SignupPage'
import SigninPage from './Pages/SigninPage'
import HomePage from './Pages/HomePage'
import CourseDetail from './Pages/CourseDetail';
import ShoppingCart from './Pages/ShoppingCart';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from './Component/ShoppingCart/Cart/Cart';
 function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage/>
        },
        {
            path: 'api/Account/signin',
            element: <SigninPage/>
        },
        {
            path: 'api/account/registor',
            element: <SignupPage/>
        },
        {
            path: '/CourseDetail',
            element: <CourseDetail/>
        },
        {
            path: '/Cart',
            element: <Cart/>
           // element: <ShoppingCart/>
        }
    ])
    
    return <RouterProvider router={router}/>;

}
export default App;
