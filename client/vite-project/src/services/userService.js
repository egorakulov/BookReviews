/*
Connection between front end requests and backend API for user services
*/

import { API_BASE } from "./bookService";

// prompts backend and returns the status code associated with this request
// 200 - successful login
// 401 - incorrect user name or password
// 400 - error on server
export async function login(email, password) {
    const data = {email, password};
    const res = await fetch(`${API_BASE}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    return res.status;
}

// prompts backend to create a new user
// returns status code associated with this request
// 201 - successfully created user
// 422 - a user with that email already exists
// 400 - error on server
export async function createUser(name, email, password) {
    const data = {name, email, password};
    const res = await fetch(`${API_BASE}/users/create-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.status;
}
