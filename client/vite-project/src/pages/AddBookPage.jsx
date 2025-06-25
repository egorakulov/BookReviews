import { useState } from 'react';

export default function AddBookPage() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    avgRating: '',
    numReviews: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
        ...formData,
        avgRating: parseFloat(formData.avgRating),
        numReviews: parseInt(formData.numReviews),
    }
    const res = await fetch('http://localhost:3232/books/addBook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Book added successfully!');
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
      alert(`Failed to add book: ${error.error}`);
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Add a Book</h1>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}
