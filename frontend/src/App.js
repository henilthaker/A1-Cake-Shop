import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import Footer from './components/footer';
import ContactUs from './pages/ContactUs'

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
            <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup />} />
            <Route path='/contact' element={<ContactUs />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
