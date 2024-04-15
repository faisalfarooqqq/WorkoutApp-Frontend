import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';
import { useAuthContext } from './hooks/useAuthContext';


function App() {
  const { user } = useAuthContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={ user ? <Home /> : <Navigate to="/login" />}/>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>} />

      </Routes>
    </Router>
  )
}

export default App
