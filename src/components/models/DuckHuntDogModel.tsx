import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Modelo procedural low-poly del perro de Duck Hunt
export default function DuckHuntDogModel({ autoSpin = false }: { autoSpin?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const tailRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    timeRef.current += delta
    if (autoSpin && groupRef.current) {
      groupRef.current.rotation.y += delta * 1.4
    }
    // Animación de la cola moviéndose
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(timeRef.current * 5) * 0.4
    }
  })

  return (
    <group ref={groupRef} position={[0, -1.0, 0]}>
      {/* Cuerpo */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.9, 0.7, 0.6]} />
        <meshStandardMaterial color="#C8860A" />
      </mesh>

      {/* Barriga más clara */}
      <mesh position={[0, 0.72, 0.3]}>
        <boxGeometry args={[0.7, 0.5, 0.04]} />
        <meshStandardMaterial color="#F0B060" />
      </mesh>

      {/* Cuello */}
      <mesh position={[0, 1.3, 0.1]}>
        <boxGeometry args={[0.5, 0.35, 0.45]} />
        <meshStandardMaterial color="#C8860A" />
      </mesh>

      {/* Cabeza */}
      <mesh position={[0, 1.72, 0.15]}>
        <boxGeometry args={[0.75, 0.6, 0.65]} />
        <meshStandardMaterial color="#C8860A" />
      </mesh>

      {/* Hocico */}
      <mesh position={[0, 1.6, 0.48]}>
        <boxGeometry args={[0.45, 0.32, 0.22]} />
        <meshStandardMaterial color="#F0B060" />
      </mesh>

      {/* Nariz negra */}
      <mesh position={[0, 1.72, 0.6]}>
        <boxGeometry args={[0.2, 0.14, 0.08]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Ojos */}
      <mesh position={[-0.2, 1.82, 0.46]}>
        <boxGeometry args={[0.14, 0.14, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.2, 1.82, 0.46]}>
        <boxGeometry args={[0.14, 0.14, 0.06]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Orejas caídas */}
      <mesh position={[-0.46, 1.68, 0.0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.22, 0.5, 0.14]} />
        <meshStandardMaterial color="#A06008" />
      </mesh>
      <mesh position={[0.46, 1.68, 0.0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.22, 0.5, 0.14]} />
        <meshStandardMaterial color="#A06008" />
      </mesh>

      {/* Pata delantera izquierda */}
      <mesh position={[-0.28, 0.28, 0.16]}>
        <boxGeometry args={[0.22, 0.5, 0.22]} />
        <meshStandardMaterial color="#C8860A" />
      </mesh>
      {/* Pata delantera derecha */}
      <mesh position={[0.28, 0.28, 0.16]}>
        <boxGeometry args={[0.22, 0.5, 0.22]} />
        <meshStandardMaterial color="#C8860A" />
      </mesh>
      {/* Pata trasera izquierda */}
      <mesh position={[-0.28, 0.28, -0.2]}>
        <boxGeometry args={[0.22, 0.5, 0.25]} />
        <meshStandardMaterial color="#C8860A" />
      </mesh>
      {/* Pata trasera derecha */}
      <mesh position={[0.28, 0.28, -0.2]}>
        <boxGeometry args={[0.22, 0.5, 0.25]} />
        <meshStandardMaterial color="#C8860A" />
      </mesh>

      {/* Cola */}
      <mesh ref={tailRef} position={[0, 1.05, -0.38]}>
        <boxGeometry args={[0.12, 0.55, 0.12]} />
        <meshStandardMaterial color="#C8860A" />
      </mesh>

      {/* Pato que lleva en la boca */}
      <group position={[0, 1.62, 0.75]}>
        <mesh>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#4CAF50" />
        </mesh>
        {/* Alas del pato */}
        <mesh position={[-0.22, 0, 0]} rotation={[0, 0, 0.5]}>
          <boxGeometry args={[0.2, 0.08, 0.3]} />
          <meshStandardMaterial color="#66BB6A" />
        </mesh>
        <mesh position={[0.22, 0, 0]} rotation={[0, 0, -0.5]}>
          <boxGeometry args={[0.2, 0.08, 0.3]} />
          <meshStandardMaterial color="#66BB6A" />
        </mesh>
        {/* Pico */}
        <mesh position={[0, 0, 0.22]}>
          <boxGeometry args={[0.12, 0.07, 0.1]} />
          <meshStandardMaterial color="#FFA000" />
        </mesh>
      </group>

      {/* Hierba del suelo */}
      {[-0.6, -0.3, 0, 0.3, 0.6, 0.9, -0.9].map((x, i) => (
        <mesh key={i} position={[x, -0.08, (i % 3) * 0.2 - 0.2]}>
          <boxGeometry args={[0.08, 0.22, 0.05]} />
          <meshStandardMaterial color="#2E7D32" />
        </mesh>
      ))}
    </group>
  )
}
