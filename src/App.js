import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Login';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" exact element={<Login />}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
