/*
Once user logs in, this is the home page they see
*/

import { useEffect, useState } from 'react';
import { getAllBooks } from '../services/bookService';
import { NavBar } from '../components/NavBar';

export default function HomePage() {
    const [books, setBooks] = useState([]);
  
    useEffect(() => {
      getAllBooks().then(setBooks).catch(console.error);
    }, []);

  
    return (
      <div>
        <div>{NavBar()}</div>
        <div style={{ padding: '2rem' }}>
        <h1>All Books</h1>
        <ul>
          {books.map(book => (
            <li key={book._id}>
              <strong>{book.title}</strong> by {book.author}, a {book.genre.toLowerCase()} with a {book.avgRating} rating and {book.numReviews} reviews!
            </li>
          ))}
        </ul>
      </div>
      </div>
    
    );
  }