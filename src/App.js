import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Studio from './components/three/Studio';
import Decks from './components/decks/Decks';
import { Menu } from './components/Menu';
import SideBar from './components/Menu/SideBar';
import Profile from './components/account/Profile';
import { UserContext } from './components/account/UserInfo';

import { ProtectedRoute, Login, SignOut } from './components/account/Login';

import './App.css'
import { Home } from './components/home/Home';
import { Settings } from './components/account/Settings';
import { CreateAccount } from './components/account/CreateAccount';
import OtherProfile from './components/account/OtherProfile';

const App = () => {

  const [mode, setMode] = useState(localStorage.getItem('darkMode') ? localStorage.getItem('darkMode') : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [sound, setSound] = useState(localStorage.getItem('sound') ? localStorage.getItem('sound') === "true" : true);
  const [user, setUser] = useState({});

  useEffect(() => {
    localStorage.setItem('darkMode', mode)
  }, [mode])

  useEffect(() => {
    localStorage.setItem('sound', sound)
  }, [sound])

  const layout = (children, login) => {

    return (
      <>
        <Menu className='menu' setMode={setMode} setSound={setSound} mode={mode} sound={sound} login={login} />
        <div className='content'>
          {children}
        </div>
        {login ? <SideBar mode={mode} sound={sound} /> : <></>}
      </>
    )
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <div className={`app ${mode}`}>
          <Routes>
            <Route path='/login' element={layout(<Login />, false)} />
            <Route path='/join' element={layout(<CreateAccount />, false)} />
            <Route path='/' element={<ProtectedRoute>{layout(<Home />, true)}</ProtectedRoute>}></Route>
            <Route path='/profile' element={<ProtectedRoute>{layout(<Profile />, true)}</ProtectedRoute>}></Route>
            <Route path='/user/:username' element={<ProtectedRoute>{layout(<OtherProfile />, true)}</ProtectedRoute>}></Route>
            <Route path='/studio' element={<ProtectedRoute>{layout(<Studio />, true)}</ProtectedRoute>}></Route>
            <Route path='/decks' element={<ProtectedRoute>{layout(<Decks />, true)}</ProtectedRoute>}></Route>
            <Route path='/settings' element={<ProtectedRoute>{layout(<Settings />, true)}</ProtectedRoute>}></Route>
            <Route path='/sign-out' element={<ProtectedRoute>{layout(<SignOut />, true)}</ProtectedRoute>}></Route>
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>

  )
}

export default App