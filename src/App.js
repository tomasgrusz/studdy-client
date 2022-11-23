import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Three from './components/three';
import Decks from './components/flashcards/Decks';
import { Menu } from './components/Menu';

import { ProtectedRoute, Login, SignOut } from './components/account/Login';

import './App.css'

const App = () => {
  return (
    <>
      <Menu className='menu' />
      <div className='content'>
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<ProtectedRoute>Home</ProtectedRoute>}></Route>
            <Route path='/profile' element={<ProtectedRoute>Profile</ProtectedRoute>}></Route>
            <Route path='/studio' element={<ProtectedRoute><Three /></ProtectedRoute>}></Route>
            <Route path='/flashcards' element={<ProtectedRoute><Decks /></ProtectedRoute>}></Route>
            <Route path='/settings' element={<ProtectedRoute></ProtectedRoute>}></Route>
            <Route path='/sign-out' element={<ProtectedRoute><SignOut /></ProtectedRoute>}></Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App