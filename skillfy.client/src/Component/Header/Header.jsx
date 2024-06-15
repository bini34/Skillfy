import './Header.css';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

function Header({ color, backgroundColor}) {
    return (
        <div className='header-main_container' style={{backgroundcolor:backgroundColor}}>
            <header className="header-Container">
                <Link to="/" className="logo">Skillfy</Link>
                <NavBar color={color} />
            </header>
        </div>
    );
}

export default Header;
