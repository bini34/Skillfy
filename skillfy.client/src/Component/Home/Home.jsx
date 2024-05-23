
import Header from '../Header/Header';
import './Home.css';
import my from '../../assets/image/young.png'
import TopCategories from './CatagiesContainer'
function Home(){
    return(

        <div className="mainContainer">
                <div  className='topContainer Container'>
                <Header/>
                </div>

                <div  className='catagiesContainer Container'>
                <TopCategories/>
                    
                </div>

                <div  className='courseContainer Container'>
                    
                </div>
                <div  className="testimonyContainer Container">
                    
                </div>
                <div className="aboutContainer Container">
                </div>
        </div>
    );
}
export default Home;

