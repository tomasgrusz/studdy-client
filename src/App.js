import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Studio from './components/three/Studio';
import Decks from './components/decks/Decks';
import { Menu } from './components/Menu';
import SideBar from './components/Menu/SideBar';
import Profile from './components/account/Profile';

import { ProtectedRoute, Login, SignOut } from './components/account/Login';

import './App.css'

const App = () => {

  const [mode, setMode] = useState(localStorage.getItem('darkMode') ? localStorage.getItem('darkMode') : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  useEffect(() => {
    localStorage.setItem('darkMode', mode)
  }, [mode])

  return (
    <div className={`app ${mode}`}>
      <Menu className='menu' setMode={setMode} mode={mode} />
      <div className='content'>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<ProtectedRoute>Home</ProtectedRoute>}></Route>
            <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
            <Route path='/studio' element={<ProtectedRoute><Studio /></ProtectedRoute>}></Route>
            <Route path='/flashcards' element={<ProtectedRoute><Decks /></ProtectedRoute>}></Route>
            <Route path='/settings' element={<ProtectedRoute></ProtectedRoute>}></Route>
            <Route path='/sign-out' element={<ProtectedRoute><SignOut /></ProtectedRoute>}></Route>
          </Routes>
        </Router>
      </div>
      <SideBar />
    </div>
  )
}

export default App