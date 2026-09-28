import { Suspense, useState, ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

interface Props {
  label: string
  color: string
  descTitle: string
  desc: string
  hint: string
  hintStop: string
  children: (autoSpin: boolean) => ReactNode
}

// Card genérica con modelo 3D interno, clic para girar + descripción
export default function ExtraCard({ label, color, descTitle, desc, hint, hintStop, children }: Props) {
  const [selected, setSelected] = useState(false)
  const [spinning, setSpinning] = useState(true)

  const toggle = () => { setSelected(true); setSpinning(p => !p) }

  return (
    <>
      <div
        className={`char-card ${selected ? 'char-card--selected' : ''}`}
        onClick={toggle}
        style={{ '--char-color': color } as React.CSSProperties}
        title={hint}
      >
        <div className="char-card-glow" style={{ boxShadow: `0 0 60px ${color}55` }} />
        <div className="char-card-label">
          <span style={{ color }}>{label}</span>
          <span className="char-card-hint">{spinning ? hintStop : hint}</span>
        </div>
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 5, 3]} intensity={1.4} />
          <pointLight position={[-3, 2, 2]} intensity={0.6} color="#aaaaff" />
          <Suspense fallback={null}>
            {children(true)}
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
      </div>

      <div className={`char-desc-panel ${selected ? 'char-desc-panel--visible' : ''}`}>
        <div className="char-desc-inner">
          <p className="char-tag">Power-Up</p>
          <h1 className="char-name" style={{ color }}>{descTitle}</h1>
          <div className="char-divider" />
          <div className="char-section">
            <p className="char-history">{desc}</p>
          </div>
        </div>
      </div>
    </>
  )
}
