import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Modelo procedural low-poly de Pac-Man con boca animada
export default function PacManModel({ autoSpin = false }: { autoSpin?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const mouthRef = useRef<THREE.Mesh>(null)
  const timeRef = useRef(0)

  useFrame((_, delta) => {
    timeRef.current += delta
    if (autoSpin && groupRef.current) {
      groupRef.current.rotation.y += delta * 1.4
    }
    // Animación de boca abriéndose y cerrándose
    if (mouthRef.current) {
      const scale = Math.abs(Math.sin(timeRef.current * 4)) * 0.8 + 0.2
      mouthRef.current.scale.y = scale
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Cuerpo principal - esfera amarilla segmentada */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.1, 16, 12, 0, Math.PI * 2, 0, Math.PI]} />
        <meshStandardMaterial color="#FFE000" side={THREE.FrontSide} />
      </mesh>

      {/* Boca - cuña negra que cubre la abertura */}
      <mesh ref={mouthRef} position={[0, 0, 0]}>
        <coneGeometry args={[1.12, 1.12, 12, 1, false, -Math.PI / 4, Math.PI / 2]} />
        <meshStandardMaterial color="#000020" side={THREE.FrontSide} />
      </mesh>

      {/* Ojo */}
      <mesh position={[0.35, 0.65, 0.88]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Brillo del ojo */}
      <mesh position={[0.42, 0.72, 0.96]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Fantasma Blinky (rojo) persiguiendo */}
      <group position={[2.5, 0, 0]}>
        {/* Cuerpo del fantasma */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.8, 8]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
        {/* Cabeza redondeada */}
        <mesh position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.5, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
        {/* Base ondulada del fantasma - 3 protuberancias */}
        {[-0.33, 0, 0.33].map((x, i) => (
          <mesh key={i} position={[x, -0.12, 0]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color="#FF0000" />
          </mesh>
        ))}
        {/* Ojos del fantasma */}
        <mesh position={[-0.18, 0.55, 0.45]}>
          <sphereGeometry args={[0.16, 8, 8]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.18, 0.55, 0.45]}>
          <sphereGeometry args={[0.16, 8, 8]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[-0.18, 0.52, 0.58]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#0000CC" />
        </mesh>
        <mesh position={[0.18, 0.52, 0.58]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#0000CC" />
        </mesh>
      </group>

      {/* Puntos del laberinto flotantes */}
      {[-1.8, -1.2, -0.6].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#FFE000" emissive="#FFE000" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}
