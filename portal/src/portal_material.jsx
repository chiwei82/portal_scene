import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

// 改用 Vite 內建 GLSL 支援（不用 macro）
import vertexShader from './shader/portal.vert'
import fragmentShader from './shader/portal.frag'

const PortalMaterial = shaderMaterial(
  {
    uColor: new THREE.Color('#E773EB'),
    uTime: 0,
    uResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
  },
  vertexShader,
  fragmentShader,
)

extend({ PortalMaterial })
export default PortalMaterial
