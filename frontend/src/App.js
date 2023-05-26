import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import Footer from './components/footer';
import ContactUs from './pages/ContactUs';
import CommentPage from './pages/Comment';
import AddCake from './pages/AddCake';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="pages">
          <Routes>
            <Route exact path='/' element={user ? <Home /> : <Navigate to='/login' />} />
            <Route exact path='/login' element={user ? <Navigate to='/' /> : <Login />} />
            <Route exact path='/signup' element={user ? <Navigate to='/' /> : <Signup />} />
            <Route exact path='/contact' element={<ContactUs />} />
            <Route exact path='/add-cake' element={<AddCake />} />
            <Route exact path='/comments/:id' element={<CommentPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
