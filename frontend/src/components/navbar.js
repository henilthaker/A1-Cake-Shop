import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <>
            <header>
                <nav>
                    <img src={`${process.env.PUBLIC_URL}/images/A1.png`} alt="" id="logo" />
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
export default Navbar;