import React, { useState } from "react";

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    const handleLoginForm = event => {
        event.preventDefault();
        setUsername("");
        setPassword("");
        handleLogin({ username, password });
    };

    return (
        <form onSubmit={handleLoginForm}>
            <div>
                username{" "}
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={handleUsernameChange}
                    autoComplete="false"
                />
            </div>
            <div>
                password{" "}
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={handlePasswordChange}
                />
            </div>
            <button type="submit">submit</button>
        </form>
    );
};

export default LoginForm;
