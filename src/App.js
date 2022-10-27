import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Three from './components/three';
import { Suspense } from 'react';


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
            <Route path='/' element={<FlashcardCreator />}></Route>
            <Route path='/profile' element={<FlashcardCreator />}></Route>
            <Route path='/studio' element={
              <Canvas id="three-canvas-container" shadows>
                <Suspense fallback={<></>}>
                  <Three />
                </Suspense>
              </Canvas>}>
            </Route>
            <Route path='/flashcards' element={<FlashcardCreator />}></Route>
            <Route path='/settings' element={<FlashcardCreator />}></Route>
            <Route path='/sign-out' element={<FlashcardCreator />}></Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App