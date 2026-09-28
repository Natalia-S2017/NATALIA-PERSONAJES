import { useNavigate } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useLang } from '../context/LanguageContext'

const base = import.meta.env.BASE_URL
const chars = [
  { label: 'Mario',          route: '/mario',  color: '#E52521', img: `${base}mario_png.png` },
  { label: 'Pac-Man',        route: '/pacman', color: '#FFE000', img: `${base}pacman_png.png` },
  { label: 'Crash Bandicoot',route: '/crash',  color: '#F97316', img: `${base}crash_png.png` },
]

export default function IntroPage() {
  const { t } = useLang()
  const navigate = useNavigate()

  return (
    <div className="page intro-page">

      {/* Texto superior */}
      <div className="intro-overlay">
        <div className="intro-badge">UNAD · Fase 2 · 2026</div>
        <h1 className="intro-title">
          {t('Recorrido Virtual 3D', '3D Virtual Tour')}
        </h1>
        <p className="intro-subtitle">
          {t('Personajes Icónicos de Videojuegos', 'Iconic Video Game Characters')}
        </p>
        <p className="intro-desc">
          {t(
            'Explora el universo de tres personajes icónicos que marcaron la historia de los videojuegos entre 1980 y 1996. Desde las primeras máquinas arcade hasta las consolas de nueva generación, estos personajes transformaron la industria del entretenimiento digital.',
            'Explore the universe of three iconic characters that shaped the history of video games between 1980 and 1996. From the first arcade machines to next-generation consoles, these characters transformed the digital entertainment industry.',
          )}
        </p>
        <div className="intro-timeline">
          <span className="intro-tl-item" style={{ color: '#E52521' }}>
            {t('Mario · 1981 · Nintendo', 'Mario · 1981 · Nintendo')}
          </span>
          <span className="intro-tl-sep">—</span>
          <span className="intro-tl-item" style={{ color: '#FFE000' }}>
            {t('Pac-Man · 1980 · Namco', 'Pac-Man · 1980 · Namco')}
          </span>
          <span className="intro-tl-sep">—</span>
          <span className="intro-tl-item" style={{ color: '#F97316' }}>
            {t('Crash · 1996 · Naughty Dog', 'Crash · 1996 · Naughty Dog')}
          </span>
        </div>
      </div>

      {/* Tarjetas de personajes como imágenes HTML */}
      <div className="intro-char-cards">
        {chars.map(({ label, route, color, img }, i) => (
          <div
            key={route}
            className="intro-char-card"
            style={{ '--c': color, animationDelay: `${i * 0.3}s` } as React.CSSProperties}
            onClick={() => navigate(route)}
          >
            {img
              ? <img src={img} alt={label} className="intro-char-img" />
              : <div className="intro-char-placeholder" style={{ background: color }} />
            }
            <span className="intro-char-card-label" style={{ color }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Estrellas de fondo */}
      <Canvas
        camera={{ position: [0, 1, 11], fov: 58 }}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 6, 4]} intensity={2} color="#a090ff" />
        <Stars radius={90} depth={60} count={4000} factor={4} saturation={0.5} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.05} />
      </Canvas>

    </div>
  )
}
