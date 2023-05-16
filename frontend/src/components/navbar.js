import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useLogout } from '../hooks/useLogout';
const Navbar = () => {
    const { user } = useContext(AuthContext);
    const { logout } = useLogout();

    const handleClick = (e) => {
        logout();
    }
    return (
        <>
            <header>
                <nav>
                    <img src={`${process.env.PUBLIC_URL}/images/A1.png`} alt="" id="logo" />
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>

                        <div className="auth">
                            {!user &&
                                <>
                                    <li><Link to="/login">Login</Link></li>
                                    <li><Link to="/signup">Signup</Link></li>
                                </>
                            }

                            {user &&
                                <>
                                    <button onClick={handleClick}>Logout</button>
                                    <span className = "username">{user.name}</span>
                                </>
                            }
                        </div>

                    </ul>
                </nav>
            </header>
        </>
    )
}
export default Navbar;