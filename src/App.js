import './styles/App.css';
import { Routes, Route} from 'react-router-dom';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Header from './Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Error from './pages/Error';


function App() {
  return (
  <>
    <Header/>
    <Routes>
      <Route path='/' element={<Shop/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/error' element={<Error/>} />

    </Routes>
  
  
  </>
  );
}

export default App;
