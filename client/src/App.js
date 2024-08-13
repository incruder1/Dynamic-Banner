import logo from './logo.svg';
import './App.css';
import Homepage from './pages/Homepage';
import { Route,Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
 <>
 <Routes>
  <Route path="/" element={<Homepage />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/login" element={<Login />} />
 </Routes>
 
  </>
  );
}

export default App;
