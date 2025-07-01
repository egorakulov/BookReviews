import { Routes, Route, Navigate } from 'react-router-dom';
import AddBookPage from './pages/AddBookPage';
import AllBooksPage from './pages/AllBooksPage';
import LoginPage from './pages/LoginPage';
import CreateNewUserPage from './pages/CreateNewUserPage';
import SearchBooksPage from './pages/SearchBooksPage';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Navigate to='/users/login' />} />
        <Route path="/books" element={<Navigate to="/books/add-books" />} />
        <Route path="/books/add-books" element={<AddBookPage />} />
        <Route path="/books/all-books" element={<AllBooksPage />} />
        <Route path="/books/search" element={<SearchBooksPage />} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path='/users/create-new-user' element={<CreateNewUserPage />} />
      </Routes>
  );
}

export default App;
