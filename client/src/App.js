import './App.css';
import Main from './pages/Main';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './pages/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/signup' element={<div>This is Sign up Page </div>} />
        <Route path='/signin' element={<div>This is Sign in Page</div>} />
        <Route path='*' element={<div>Error component should be added</div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
