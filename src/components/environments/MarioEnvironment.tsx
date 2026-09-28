import { Suspense, useRef, useState } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HongoProps {
  position: [number, number, number]
  lang?: 'es' | 'en'
  onFocus?: (pos: [number, number, number]) => void
  yOffset?: number
}

// Hongo interactivo: clic para girar + descripción
function Hongo({ position, lang = 'es', onFocus, yOffset = 0 }: HongoProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/hongo.glb')
  const [spinning, setSpinning] = useState(false)
  const [selected, setSelected] = useState(false)

  useFrame((_, delta) => {
    if (spinning && groupRef.current) {
      groupRef.current.rotation.y += delta * 1.2
    }
  })

  const desc = lang === 'es'
    ? 'El Super Hongo hace crecer a Mario al doble de su tamaño.'
    : 'The Super Mushroom makes Mario grow to double his size.'

  const worldPos: [number, number, number] = [position[0], position[1] + yOffset, position[2]]
  const tooltipPos: [number, number, number] = [position[0], position[1] + yOffset + 3, position[2]]

  return (
    <>
      {/* Modelo girable — yOffset sube el modelo hasta apoyarse en el suelo */}
      <group
        ref={groupRef}
        position={worldPos}
        scale={50}
        onClick={() => { setSpinning(p => !p); setSelected(true); onFocus?.(worldPos) }}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
      >
        <primitive object={scene.clone()} />
      </group>

      {/* Tooltip fuera del grupo escalado para que no herede la escala */}
      {selected && (
        <Html center position={tooltipPos} style={{ pointerEvents: 'none' }}>
          <div style={{
            background: 'rgba(8,8,18,0.88)',
            border: '1px solid rgba(229,37,33,0.4)',
            borderRadius: '10px',
            padding: '9px 14px',
            color: '#fff',
            fontSize: '0.75rem',
            lineHeight: '1.5',
            maxWidth: '190px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(229,37,33,0.2)',
            fontFamily: 'Inter, sans-serif',
            whiteSpace: 'normal',
          }}>
            🍄 <strong style={{ color: '#E52521' }}>Super Hongo</strong><br />
            {desc}
            <div style={{ marginTop: 6, fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>
              {lang === 'es' ? 'Clic para girar' : 'Click to spin'}
            </div>
          </div>
        </Html>
      )}
    </>
  )
}

useGLTF.preload('/hongo.glb')

// Entorno del Reino Champiñón
export default function MarioEnvironment({ lang = 'es', onFocus }: { lang?: 'es' | 'en'; onFocus?: (pos: [number, number, number]) => void }) {
  return (
    <>
      {/* Suelo verde */}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>

      {/* Bloques flotantes */}
      {[[-2, 1.5, -3], [0, 2.5, -4], [2, 1.5, -3], [-1, 3.5, -4], [1, 3.5, -4]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#CD853F' : '#FFD700'} />
        </mesh>
      ))}

      {/* Tuberías verdes */}
      {[[-3.5, -0.8, -2], [3.5, -0.8, -2]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh>
            <cylinderGeometry args={[0.4, 0.4, 1.4, 8]} />
            <meshStandardMaterial color="#2E7D32" />
          </mesh>
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.48, 0.48, 0.25, 8]} />
            <meshStandardMaterial color="#388E3C" />
          </mesh>
        </group>
      ))}

      {/* Nubes */}
      {[[-3, 4, -5], [3, 5, -6], [0, 5.5, -7]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh><sphereGeometry args={[0.6, 8, 8]} /><meshStandardMaterial color="white" /></mesh>
          <mesh position={[-0.5, -0.1, 0]}><sphereGeometry args={[0.45, 8, 8]} /><meshStandardMaterial color="white" /></mesh>
          <mesh position={[0.5, -0.1, 0]}><sphereGeometry args={[0.45, 8, 8]} /><meshStandardMaterial color="white" /></mesh>
        </group>
      ))}

      {/* Hongos interactivos */}
      <Suspense fallback={null}>
        <Hongo position={[-4, -1.5, -1]} lang={lang} onFocus={onFocus} yOffset={-2} />
      </Suspense>

      {/* Estrellas */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 18, Math.random() * 6 + 2, -8 - Math.random() * 4]}>
          <sphereGeometry args={[0.06, 4, 4]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
        </mesh>
      ))}
    </>
  )
}
