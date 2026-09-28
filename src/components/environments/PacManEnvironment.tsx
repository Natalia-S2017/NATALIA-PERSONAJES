// Entorno de laberinto oscuro para la escena de Pac-Man
export default function PacManEnvironment() {
  // Segmentos de pared del laberinto en formato [x, y, z, ancho, alto, profundidad]
  const walls: [number, number, number, number, number, number][] = [
    [-4, 0, -3, 0.3, 4, 0.3],
    [4, 0, -3, 0.3, 4, 0.3],
    [0, 0, -5, 8, 0.3, 0.3],
    [-2, 1.5, -3.5, 3, 0.3, 0.3],
    [2.5, -1, -3.5, 3, 0.3, 0.3],
    [-3, -1.5, -3, 0.3, 3, 0.3],
    [3, 1.5, -3, 0.3, 2.5, 0.3],
  ]

  // Posiciones de power pellets (puntos grandes)
  const pellets: [number, number, number][] = [
    [-3.5, 2, -2],
    [3.5, -2, -2],
    [-3.5, -2, -2],
    [3.5, 2, -2],
  ]

  return (
    <>
      {/* Suelo negro del laberinto */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#000010" />
      </mesh>

      {/* Paredes del laberinto */}
      {walls.map(([x, y, z, w, h, d], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#1a1aFF" emissive="#0000AA" emissiveIntensity={0.4} />
        </mesh>
      ))}

      {/* Power pellets brillantes en las esquinas */}
      {pellets.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.22, 8, 8]} />
          <meshStandardMaterial color="#FFE000" emissive="#FFE000" emissiveIntensity={1} />
        </mesh>
      ))}

      {/* Puntos pequeños en el camino */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (i % 6) * 1.2 - 3.5,
            Math.floor(i / 6) * 0.8 - 1.5,
            -2.5,
          ]}
        >
          <sphereGeometry args={[0.07, 6, 6]} />
          <meshStandardMaterial color="#FFE000" emissive="#FFE000" emissiveIntensity={0.6} />
        </mesh>
      ))}

      {/* Luz ambiental del laberinto (azul neón) */}
      <pointLight position={[0, 2, 0]} color="#4444FF" intensity={1.5} distance={12} />
      <pointLight position={[-3, 0, -2]} color="#FF4444" intensity={0.8} distance={6} />
    </>
  )
}
