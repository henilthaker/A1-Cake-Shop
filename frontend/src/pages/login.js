import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {Login, error, is_loading} = useLogin();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        await Login(email, password);
    }
    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <label>Email address:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            {/* button should be disabled if the page is loading */}
            <button disabled={is_loading}>Log In</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default Login;