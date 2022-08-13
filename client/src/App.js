import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from "./hoc/auth"

function App() {
  const AuthLandigPage = Auth(LandingPage,null);
  const AuthLoginPage = Auth(LoginPage,false);
  const AuthRegisterPage = Auth(RegisterPage,false); 


  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<AuthLandigPage/>}/>
          <Route path='/login' element={<AuthLoginPage/>}/>
          <Route path='/register' element={<AuthRegisterPage/>}/>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
