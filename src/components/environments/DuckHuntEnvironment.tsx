// Entorno de campo abierto para la escena del perro de Duck Hunt
export default function DuckHuntEnvironment() {
  return (
    <>
      {/* Suelo con hierba */}
      <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#388E3C" />
      </mesh>

      {/* Franja de tierra en el frente */}
      <mesh position={[0, -1.28, 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 4]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>

      {/* Cielo azul de fondo */}
      <mesh position={[0, 4, -8]}>
        <planeGeometry args={[25, 14]} />
        <meshStandardMaterial color="#87CEEB" side={2} />
      </mesh>

      {/* Arbustos */}
      {[[-4, -0.8, -2], [4.5, -0.9, -1.5], [-5, -0.9, -3], [5, -0.8, -3]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh>
            <sphereGeometry args={[0.6, 8, 8]} />
            <meshStandardMaterial color="#2E7D32" />
          </mesh>
          <mesh position={[-0.4, -0.1, 0]}>
            <sphereGeometry args={[0.45, 8, 8]} />
            <meshStandardMaterial color="#388E3C" />
          </mesh>
          <mesh position={[0.4, -0.1, 0]}>
            <sphereGeometry args={[0.45, 8, 8]} />
            <meshStandardMaterial color="#388E3C" />
          </mesh>
        </group>
      ))}

      {/* Árbol */}
      <group position={[-5.5, -1.3, -4]}>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[0.18, 0.25, 2.5, 6]} />
          <meshStandardMaterial color="#5D4037" />
        </mesh>
        <mesh position={[0, 2.8, 0]}>
          <sphereGeometry args={[1.1, 8, 8]} />
          <meshStandardMaterial color="#1B5E20" />
        </mesh>
        <mesh position={[-0.4, 3.2, 0.2]}>
          <sphereGeometry args={[0.75, 8, 8]} />
          <meshStandardMaterial color="#2E7D32" />
        </mesh>
      </group>

      {/* Patos volando en el fondo */}
      {[[1.5, 2.5, -5], [-1.5, 3, -6], [3, 1.8, -5.5]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh>
            <sphereGeometry args={[0.2, 6, 6]} />
            <meshStandardMaterial color="#4CAF50" />
          </mesh>
          <mesh position={[-0.25, 0, 0]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.22, 0.06, 0.3]} />
            <meshStandardMaterial color="#66BB6A" />
          </mesh>
          <mesh position={[0.25, 0, 0]} rotation={[0, 0, -0.4]}>
            <boxGeometry args={[0.22, 0.06, 0.3]} />
            <meshStandardMaterial color="#66BB6A" />
          </mesh>
        </group>
      ))}

      {/* Hierba alta decorativa */}
      {Array.from({ length: 25 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (i % 8) * 1.5 - 5.5,
            -1.0,
            Math.floor(i / 8) * 1.2 - 4,
          ]}
        >
          <boxGeometry args={[0.07, 0.5 + Math.random() * 0.4, 0.05]} />
          <meshStandardMaterial color="#2E7D32" />
        </mesh>
      ))}

      {/* Nubes */}
      {[[-3, 5, -7], [3, 4.5, -8], [0, 6, -7]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh>
            <sphereGeometry args={[0.8, 8, 8]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <mesh position={[-0.6, -0.1, 0]}>
            <sphereGeometry args={[0.58, 8, 8]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <mesh position={[0.6, -0.1, 0]}>
            <sphereGeometry args={[0.58, 8, 8]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </group>
      ))}
    </>
  )
}
