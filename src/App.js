import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import LoginScreen from './LoginScreen/LoginScreen';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LoginScreen />} />
        <Route path="/Login" exact element={<Login />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
