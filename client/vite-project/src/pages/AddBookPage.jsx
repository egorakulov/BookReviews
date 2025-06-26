/*
The Add Book Page
*/

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddBookPage() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    avgRating: '',
    numReviews: '',
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleAllBooksNav() {
    navigate('/books/all-books');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
        ...formData,
        avgRating: parseFloat(formData.avgRating),
        numReviews: parseInt(formData.numReviews),
    };

    try {
        const res = await fetch('http://localhost:3232/books/addBook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            setMessage('Book added successfully!');
            setIsError(false);
            setFormData({
                title: '',
                author: '',
                genre: '',
                isbn: '',
                avgRating: '',
                numReviews: '',
            });
        } else {
            const error = await res.json();
            setMessage(`Failed to add book: ${error.error}`);
            setIsError(true);
        }
    } catch (error) {
        setMessage('Could not connect to the server');
        setIsError(true);
    }
  }

  function navButtons(title, callBack) {
    return <button 
      onClick={callBack}
      style={{border: 'none', background: 'none', fontSize: '2rem', padding: '1rem', marginLeft: '1rem', marginRight: '1rem'}}
      
    >{title}</button>
  }

  return (
    <div>
      <nav>
        <div style={{display: 'flex', justifyContent: 'center', background: '#ede8d0'}}>
          {navButtons("All Books", handleAllBooksNav)}
          {navButtons("Search for Books", null)}
          {navButtons("Recent Reviews", null)}
        </div>
      </nav>
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <h1>Add a Book</h1>
        <form onSubmit={handleSubmit} style={{border: 'thin solid grey', padding: '2rem', borderRadius: '5rem'}}>
          {['title', 'author', 'genre', 'isbn', 'avgRating', 'numReviews'].map((field) => (
            <div key={field}>
              <label>{field}: </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit">Add Book</button>
        </form>

        {message && (
          <p style={{ marginTop: '1rem', color: isError ? 'red': 'green'}}>
              {message}
          </p>
        )}
      </div>
    </div>
  );
}
