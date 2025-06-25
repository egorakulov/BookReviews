import { Routes, Route, Link } from 'react-router-dom';
import AddBookPage from './pages/AddBookPage';
import AllBooksPage from './pages/AllBooksPage';

function App() {
  return (
    <div>
      <nav style={{ padding: '1rem' }}>
        <Link to="/">Add Book</Link> | <Link to="/all-books">See All Books</Link>
      </nav>

      <Routes>
        <Route path="/" element={<AddBookPage />} />
        <Route path="/all-books" element={<AllBooksPage />} />
      </Routes>
    </div>
  );
}

export default App;
