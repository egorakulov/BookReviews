/*
Once user logs in, this is the home page they see
*/

import { useEffect, useState } from 'react';
import { getAllBooks } from '../services/bookService';

export default function HomePage() {
    const [books, setBooks] = useState([]);
  
    useEffect(() => {
      getAllBooks().then(setBooks).catch(console.error);
    }, []);
  
    return (
      <div style={{ padding: '2rem' }}>
        <h1>All Books</h1>
        <ul>
          {books.map(book => (
            <li key={book._id}>
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))}
        </ul>
      </div>
    );
  }