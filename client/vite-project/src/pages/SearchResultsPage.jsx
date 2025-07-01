/*
The page that displays the results of a search
Parameters into this page are passed via the url in the form:
/books/search/result/:field/:query
*/

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { getSearchResults } from "../services/bookService";

export default function SearchResultsPage() {
    const {field, query} = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        setLoading(true);
        getSearchResults(field, query).then(setBooks).catch(console.error);
        setLoading(false);
    }, [field, query]);

    if (loading) return (
        <p>LOADING...</p>
    );

    return (
        <div>
          <h2>Search Results for {field}: "{decodeURIComponent(query)}"</h2>
          {books.length === 0 ? <p>No results found.</p> : (
            <ul>
              {books.map(book => (
                <li key={book._id}>{book.title} by {book.author}</li>
              ))}
            </ul>
          )}
        </div>
    );
}