import React from "react";

const LoginForm = ({
    handleLogin,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange
}) => {
    return (
        <form onSubmit={handleLogin}>
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
