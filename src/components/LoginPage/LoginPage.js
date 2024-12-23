import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password
        };

        try {
            const response = await fetch('/api/login', {
                method: 'POST', // Specify the method (POST in this case)
                headers: {
                    'Content-Type': 'application/json', // Specify content type as JSON
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Add Authorization header
                },
                body: JSON.stringify(loginData) // Pass the login data as a JSON string
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                // Redirect to dashboard or another page after successful login
            } else {
                setErrorMessage('Invalid email or password');
                console.error('Login failed:', data);
            }
        } catch (error) {
            setErrorMessage('An error occurred during login');
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default LoginPage;
