import './App.css';
import '../src/assets/css/style.scss'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/index';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/' />
      </Routes>
    </div>
  );
}

export default App;
