import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import Three from './components/three';
import { FlashcardCreator } from './components/flashcardCreator';
import { Menu } from './components/Menu';

import './App.css'

const App = () => {
  return (
    <>
      <Menu className='menu' />
      <div className='content'>
        <Router>
          <Routes>
            <Route path='/' element={<></>}></Route>
            <Route path='/profile' element={<></>}></Route>
            <Route path='/studio' element={<Three />}></Route>
            <Route path='/flashcards' element={<FlashcardCreator />}></Route>
            <Route path='/settings' element={<></>}></Route>
            <Route path='/sign-out' element={<></>}></Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App