import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import './index.css'
import App from './App.jsx'
import Particle from './particle'
import * as THREE from 'three'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canvas
      gl ={{ 
        toneMapping: THREE.ACESFilmicToneMapping, 
        colorSpace: THREE.SRGBColorSpace }
      }
      camera={{ fov: 60, position: [1, 4, 4], zoom: 1.2 }}
      onCreated={({ gl }) => { gl.toneMappingExposure = 0.4 }}
    >
      <App />
      <Particle />
    </Canvas>
  </StrictMode>,
)
