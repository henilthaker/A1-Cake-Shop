import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="pages">
          <Routes>

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
