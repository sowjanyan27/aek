import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginScreen from './LoginScreen/LoginScreen';
import { ToastContainer } from "react-toastify";
import Login from './Login';
import NavigationHeader from './Layout/navigationHeader';


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <NavigationHeader />
      <Routes>
        <Route path="/" exact element={<LoginScreen />} />
        {/* <Route path="/" exact element={<Login />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
