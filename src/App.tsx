import React from 'react';
import { NavBar } from './components/NavBar';
import './App.css';
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import {Login} from './components/login/Login';


const Home = () => (
  <div className='bdy'>
    <span className='title'>Libros Silvestres</span>
  </div>
);

const LoggedInRender = () => (
  <>
  <NavBar/>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
  </BrowserRouter>
  </>
);


function App() {

  const [login, setLogin] = React.useState(false);
  return <>{login ? <LoggedInRender/> : <Login setLogin={setLogin}/>}</>;
}

export default App;
