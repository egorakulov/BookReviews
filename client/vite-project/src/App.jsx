import { Routes, Route, Navigate } from 'react-router-dom';
import AddBookPage from './pages/AddBookPage';
import AllBooksPage from './pages/AllBooksPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Navigate to='/users/login' />} />
        <Route path="/books" element={<AddBookPage />} />
        <Route path="/books/all-books" element={<AllBooksPage />} />
        <Route path="/users/login" element={<LoginPage />} />
      </Routes>
  );
}

export default App;
