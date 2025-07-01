/*
The Search Books page
*/

import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export default function SearchBooksPage() {
    const [searchField, setSearchField] = useState('Title');
    const [query, setQuery] = useState('');

    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    function handleDropDownChange(e) {
        setSearchField(e.target.value);
    }

    function handleQueryChange(e) {
        setQuery(e.target.value);
    }

    function displaySearchResults(searchField, query) {
        const url = `${encodeURIComponent(searchField + "/"+ query)}`
        const fullUrl = `/books/result/${url}`
        navigate(`${fullUrl}}`)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (query === '') {
            setIsError(true);
            setMessage("YOU ARE SEARCHING FOR NOTHING");
        }
        if (searchField !== 'Title' ||
            searchField !== 'Author' ||
            searchField !== 'Genre'
        ) {
            setIsError(true);
            setMessage("ERROR: Invalid selection from drop down menu");
        }

        if (isError) return;
        displaySearchResults(searchField.toLowerCase(), query.toLowerCase());
    }

    return (
        <div>
            <div>
                {NavBar()}
            </div>
            
            <form onSubmit={handleSubmit}>
                <div key='searchField'>
                    <label>Search by</label>
                    <select onChange={handleDropDownChange}>
                        <option value="Title">Title</option>
                        <option value="Author">Author</option>
                        <option value="Genre">Genre</option>
                    </select>
                </div>

                <div key='query'>
                    <label>Search For: </label>
                    <input 
                        type='text'
                        name='query'
                        value={query}
                        onChange={handleQueryChange}
                        required
                    />
                </div>

                <button type="submit">Search</button>
            </form>

        {message && (
          <p style={{ marginTop: '1rem', color: isError ? 'red': 'green'}}>
              {message}
          </p>
        )}
    
        </div>
    )
}