import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import * as THREE from 'three'

import vertexShader from './shader/portal.vert'
import fragmentShader from './shader/portal.frag'

const PortalMaterial = shaderMaterial(
  {
    uColor: new THREE.Color('#E773EB'),
    uTime: 0,
  },
  vertexShader,
  fragmentShader,
)

extend({ PortalMaterial })
export default PortalMaterial
