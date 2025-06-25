/*
The Log-In page. The first thing the user sees when starting the website. 
*/

import { useState } from 'react';
import { login } from '../services/userService';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleLogin = () => {
        navigate('/books');
    };

    const handleCreateUser = () => {
        navigate('/users/create-new-user');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await login(formData.email, formData.password);
        if (res) {
            // logged in, switch page to add books page
            handleLogin();
        } else {
            // not logged in, go back to same page with text: incorrect username or password
            setMessage("Username or password was incorrect");
        }
    }

    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {['email', 'password'].map((field) => (
                    <div key={field}>
                        <label style={{ paddingRight: '1rem' }}>{field.charAt(0).toUpperCase() + field.slice(1)}: </label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
                <button type="submit">Login</button>
                <button type="button" onClick={handleCreateUser}>Create Account</button>
            </form>

            {message && (
                <p style={{ marginTop:'1rem', color:'red'}}>
                    {message}
                </p>
            )}
        </div>
    );
}