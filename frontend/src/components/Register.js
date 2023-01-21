import { useState } from "react";

function Register() {

    const [username, setUsername] = useState([]);
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [error, setError] = useState([]);

    async function Register(e) {
        e.preventDefault();
        // fetching request from specified route
        const res = await fetch("http://localhost:3001/users", {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        // awaiting JSON response
        const data = await res.json();
        // registration successful - redirect to index page
        if (data._id !== undefined) {
            window.location.href = "/";
        }
        // registration failed
        else {
            setUsername("");
            setEmail("");
            setPassword("");
            setError("Registration failed");
        }
    }

    // each React component returns JSX code (similar to HTML)
    // in this case, we're returning a register form
    return (
        <form onSubmit={Register}>
            <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="submit" name="submit" value="REGISTER"/>
            <label>{error}</label>
        </form>
    );
}

export default Register;