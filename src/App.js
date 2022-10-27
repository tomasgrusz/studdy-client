import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css'
import Three from './components/three';
import { FlashcardCreator } from './components/flashcardCreator';

function App() {
  return (
    <>
      <FlashcardCreator></FlashcardCreator>
      {/* <Canvas id="three-canvas-container" shadows>
        <Suspense fallback={<></>}>
          <Three />
        </Suspense>
      </Canvas> */}
    </>
  )
}

export default App