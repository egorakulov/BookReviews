/*
Connection between front end requests and backend API for book services
*/

const API_BASE = "http://localhost:3232";

export async function getAllBooks() {
    const res = await fetch(`&{API_BASE}/books/allBooks`);
    if (!res.ok) throw new Error('Failed to fetch books');
    return res.json();
}