/*
The Create User Page
The user lands on this page after they click "Create Account" on the login page.
After filling out the fields and pressing Create Account, they will be taken back to the login page,
at which point they will be able to user their credentials to login. 
*/

import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { createUser } from '../services/userService';

export default function CreateUser() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    function handleCreateUser() {
        navigate('/users/login');
    }

    function handleLoginNav() {
        navigate('/users/login');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (formData.password !== formData.password2) {
            setMessage("ERROR: passwords do not match up");
            console.log("passwords don't match up");
        } else {
            // passwords do match up
            const res = await createUser(formData.name, formData.email, formData.password);
            if (res === 201) {
                // successfully created user
                handleCreateUser();
            } else if (res === 422) {
                setMessage("User with this email already exists");
            } else {
                setMessage('Error occurred when handling your request - please try again later');
            }
        }
    }

    return (
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem'}}>
        <h1>New User</h1>
        <p>Welcome to Book Reviews! Enter the following information to create an account and access the platform!</p>
        <form onSubmit={handleSubmit}>
            {['name', 'email', 'password', 'password2'].map((field) => (
                <div key={field}>
                    <label style={{paddingRight: '1rem'}}>
                        {!field.includes('password') ? field.charAt(0).toUpperCase() + field.slice(1) : field === 'password2' ? "Enter password again" : "Enter your password"}: 
                    </label>
                    <input 
                        type= {field.includes('password') ? 'password' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                    />
                </div>
            ))}
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
                <button type="submit" style={{padding: '0.25rem', borderRadius: '0.5rem'}}>Create Account!</button>
                <button type="button" onClick={handleLoginNav}style={{padding: '0.25rem', borderRadius: '0.5rem'}}>Go Back</button>
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