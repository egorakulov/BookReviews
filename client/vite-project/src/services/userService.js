/*
Connection between front end requests and backend API for user services
*/

import { API_BASE } from "./bookService";

// prompts backend and returns true if user is logged in, false if not, and throws an error if an error occurs
export async function login(email, password) {
    const res = await fetch(`${API_BASE}/users/${email}/${password}`);
    console.log(res.status);
    if (res.status === 400) throw new Error('Failed to attempt login');
    if (res.status === 200) {
        return true;
    }
    console.log("Returning false from login function");
    return false;
}