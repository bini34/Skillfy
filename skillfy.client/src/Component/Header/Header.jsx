import './Header.css'
function Header() {

    return (
        <header className="header">
            <div className="logo">Skillfy</div>
            <nav>
                <ul className="nav-list">
                    <li className="nav-item">
                        <a href="#" className="nav-link">Categories</a>
                    </li>
                    <li className="nav-item search">
                        <input type="text" placeholder="What do you want learn ?" />
                        <button><i className="fas fa-search"></i></button>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">Pages</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">Courses</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link">Login</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link register">Register</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;