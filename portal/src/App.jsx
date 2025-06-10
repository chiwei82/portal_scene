import './App.css'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGLTF, OrbitControls  } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import PortalMaterial from './portal_material.jsx'

function App() {
  const { scene } = useGLTF('./portal.glb')
  // console.log(scene)
  const emissiveMaterial = new THREE.MeshStandardMaterial({
    color: '#000000',
    emissive: new THREE.Color('#D0C588'),
    emissiveIntensity: 3.5,
    roughness: 0.2,
    metalness: 0.0,
    transparent: true,
    opacity: 1.0
  })

  const portalMatRef = useRef()

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader()

    // 載入 baked 的 fences 貼圖
    const fenceTexture = textureLoader.load('./fences.png')
    fenceTexture.flipY = false
    fenceTexture.encoding = THREE.SRGBColorSpace
    const fenceMaterial = new THREE.MeshBasicMaterial({ map: fenceTexture })

    // 載入 baked 的 rock 貼圖
    const rockTexture = textureLoader.load('./rocks.png')
    rockTexture.flipY = false
    rockTexture.encoding = THREE.SRGBColorSpace
    const rockMaterial = new THREE.MeshBasicMaterial({ map: rockTexture })

    // 載入 all_others 的 rock 貼圖
    const allothersTexture = textureLoader.load('./all_others.png')
    allothersTexture.flipY = false
    allothersTexture.encoding = THREE.SRGBColorSpace
    const allothersMaterial = new THREE.MeshBasicMaterial({ map: allothersTexture })

    scene.traverse((obj) => {
      if (!obj.isMesh || !obj.name) return
    
      const name = obj.name.toLowerCase()
    
      if (name.includes('fence')) {
        obj.material = fenceMaterial
      }
    
      if (name.includes('rock') && !name.includes('portal')) {
        obj.material = rockMaterial
      }
    
      const others = ['portal_rock', 'ladder', 'plane', 'bracket', 'rope', 'lamp']
      if (others.some(keyword => name.includes(keyword))) {
        obj.material = allothersMaterial
      }

      if (['light_l', 'light_r'].some(key => name.includes(key))) {
        obj.material = emissiveMaterial
      }

      if (name.includes('portal_plate')) {
        const mat = new PortalMaterial()
        mat.side = THREE.DoubleSide
        portalMatRef.current = mat
        obj.material = mat
      }

    })
       
  }, [scene])

  useFrame((state) => {
    if (portalMatRef.current) {
      portalMatRef.current.uTime = state.clock.getElapsedTime()
    }
  })

  return (
    <>
      <primitive object={scene} rotation={[0, Math.PI, 0]} position={[0, -1, 0]} />
      <OrbitControls />
    </>
  )
}

export default App
