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
        if (res === 200) {
            // logged in, switch page to add books page
            handleLogin();
        } else if (res === 401){
            // not logged in, go back to same page with text: incorrect username or password
            setMessage("Either no account associated with this email, or password was incorrect");
        } else {
            setMessage("Error occurred when handling your request - please try again later");
        }
    }

    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1>Welcome to Book Reviews!</h1>
            <p>Book Reviews is a platform that allows you to review your favorite books and search for your next book to read!</p>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{border: 'thin solid grey', padding: '2rem', borderRadius: '5rem'}}>
                {['email', 'password'].map((field) => (
                    <div key={field}>
                        <label style={{ paddingRight: '1rem' }}>{field.charAt(0).toUpperCase() + field.slice(1)}: </label>
                        <input
                            type = {field === 'password' ? 'password' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
                    <button type="submit" style={{padding: '0.5rem', borderRadius: '0.5rem', marginRight: '0.25rem'}}>Login</button>
                    <button type="button" style={{padding: '0.5rem', borderRadius: '0.5rem', marginLeft: '0.25rem'}} onClick={handleCreateUser}>Create Account</button>
                </div>
            </form>

            {message && (
                <p style={{ marginTop:'1rem', color:'red'}}>
                    {message}
                </p>
            )}
        </div>
    );
}