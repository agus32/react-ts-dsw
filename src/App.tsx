import React from 'react';
import { NavBar } from './components/NavBar';
import './App.css';
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import {Login} from './components/login/Login';
import {setToken} from './components/ApiHandler';
import { PeopleTable } from './components/personas/PeopleTable';

const Home = () => (
  <div className='bdy'>
    <span className='title'>Libros Silvestres</span>
  </div>
);

const LoggedInRender = ({ handleLogout }: { handleLogout: () => void }) => (
  <>
  <NavBar/>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/autores" element={<PeopleTable type='autor'/>}/>
      <Route path="/ilustradores" element={<PeopleTable type='ilustrador'/>}/>
    </Routes>
  </BrowserRouter>
  </>
);

const UserInitialState = {
  username: "",
  token: "",
};

function App() {

  const [user, setUser] = React.useState(UserInitialState);

  React.useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if(loggedUserJSON){
      const userParsed = JSON.parse(loggedUserJSON);
      setUser(userParsed);
      setToken(userParsed.token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setUser(UserInitialState);
    setToken("");
  };

  return <>{(user != UserInitialState) ? <LoggedInRender handleLogout={handleLogout}/> : <Login setUser={setUser}/>}</>;
}

export default App;
