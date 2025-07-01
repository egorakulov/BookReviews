/*
Connection between front end requests and backend API for book services
*/

export const API_BASE = "http://localhost:3232";

export async function getAllBooks() {
    const res = await fetch(`${API_BASE}/books/allBooks`);
    if (!res.ok) throw new Error('Failed to fetch books');
    return res.json();
}

export async function getSearchResults(searchField, query) {
    const res = await fetch(`${API_BASE}/books/${searchField}/${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to fetch search results');
    return res.json();
}