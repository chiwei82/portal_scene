import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particle({ maxCount = 200, spawnRate = 10, heightLimit = 4 }) {
  const pointsRef = useRef()
  const [particles, setParticles] = useState([])

  // 每幀更新位置
  useFrame(() => {
    // 漂浮速度
    const speed = 0.001
    const updated = particles
      .map(p => ({ ...p, y: p.y + speed }))
      .filter(p => p.y < heightLimit)

    setParticles(updated)
  })

  // 定時生成新粒子
  useEffect(() => {
    const interval = setInterval(() => {
      if (particles.length >= maxCount) return

      setParticles(p => [
        ...p,
        {
          x: (Math.random() - 0.5) * 1.5,
          y: 1.5 + Math.random() * 0.5 - 0.5,
          z: (Math.random() - 0.5) * 1.0-1,
          size: 0.03 + Math.random() * 0.05,
        },
      ])
    }, 1000 / spawnRate)

    return () => clearInterval(interval)
  }, [particles.length])

  // 畫面更新 geometry
  useEffect(() => {
    if (!pointsRef.current) return

    const positions = new Float32Array(particles.length * 3)
    particles.forEach((p, i) => {
      positions.set([p.x, p.y, p.z], i * 3)
    })

    pointsRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    )
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  }, [particles])

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        color="#E773EB"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  )
}
