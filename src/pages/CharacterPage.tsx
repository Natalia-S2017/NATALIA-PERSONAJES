import { Suspense, Component, ReactNode, useRef, useState, useEffect, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useLang } from '../context/LanguageContext'
import type { CharacterData } from '../data/characters'
import MarioModel from '../components/models/MarioModel'
import PacManModel from '../components/models/PacManModel'
import PacManGLBModel from '../components/models/PacManGLBModel'
import DuckHuntDogModel from '../components/models/DuckHuntDogModel'
import HongoModel from '../components/models/HongoModel'
import CuboModel from '../components/models/CuboModel'
import BowserModel from '../components/models/BowserModel'
import PeachModel from '../components/models/PeachModel'
import LuigiModel from '../components/models/LuigiModel'
import YoshiModel from '../components/models/YoshiModel'
import InkyModel from '../components/models/InkyModel'
import BlinkyModel from '../components/models/BlinkyModel'
import ClydeModel from '../components/models/ClydeModel'
import PinkyModel from '../components/models/PinkyModel'
import CrashModel from '../components/models/CrashModel'
import NeoCortexModel from '../components/models/NeoCortexModel'
import NitrusBrioModel from '../components/models/NitrusBrioModel'
import NGinModel from '../components/models/NGinModel'
import UkaUkaModel from '../components/models/UkaUkaModel'
import NTropyModel from '../components/models/NTropyModel'

class SceneErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  render() {
    if (this.state.error) return null
    return this.props.children
  }
}

function CardScene({ id }: { id: string }) {
  const camZ = id === 'yoshi' ? 18 : 4
  return (
    <Canvas camera={{ position: [0, 0, camZ], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 3]} intensity={1.4} />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#aaaaff" />
      <Suspense fallback={null}>
        <SceneErrorBoundary>
          {id === 'mario'    && <MarioModel    autoSpin={false} />}
          {id === 'pacman'   && <PacManGLBModel autoSpin={false} />}
          {id === 'duckhunt' && <DuckHuntDogModel autoSpin={false} />}
          {id === 'hongo'    && <HongoModel    autoSpin={false} />}
          {id === 'cubo'     && <CuboModel     autoSpin={false} />}
          {id === 'bowser'   && <BowserModel   autoSpin={false} />}
          {id === 'peach'    && <PeachModel    autoSpin={false} />}
          {id === 'luigi'    && <LuigiModel    autoSpin={false} />}
          {id === 'yoshi'    && <YoshiModel    autoSpin={false} />}
          {id === 'inky'     && <InkyModel     autoSpin={false} />}
          {id === 'blinky'   && <BlinkyModel   autoSpin={false} />}
          {id === 'clyde'    && <ClydeModel    autoSpin={false} />}
          {id === 'pinky'      && <PinkyModel     autoSpin={false} />}
          {id === 'crash'      && <CrashModel     autoSpin={false} />}
          {id === 'neo_cortex' && <NeoCortexModel autoSpin={false} />}
          {id === 'nitrus_brio'&& <NitrusBrioModel autoSpin={false} />}
          {id === 'n_gin'      && <NGinModel      autoSpin={false} />}
          {id === 'uka_uka'    && <UkaUkaModel    autoSpin={false} />}
          {id === 'n_tropy'    && <NTropyModel    autoSpin={false} />}
        </SceneErrorBoundary>
      </Suspense>
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  )
}

interface CarouselItem { id: string; label: string; color: string }

const CARD_W = 260
const CARD_H = 340
const RADIUS_X = 300   // radio horizontal del carrusel
const SPIN_SPEED = 0.25 // radianes por segundo

function Carousel3D({ items, onActiveChange, paused, hint }: {
  items: CarouselItem[]
  onActiveChange: (idx: number) => void
  paused: boolean
  hint: string
}) {
  const n = items.length
  const angleRef = useRef(0)
  const rafRef = useRef<number>(0)
  const prevTimeRef = useRef<number>(0)
  const activeIdxRef = useRef(-1)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const innerCardRefs = useRef<(HTMLDivElement | null)[]>([])
  const pausedRef = useRef(paused)

  useEffect(() => { pausedRef.current = paused }, [paused])

  useEffect(() => {
    const loop = (now: number) => {
      const dt = prevTimeRef.current ? (now - prevTimeRef.current) / 1000 : 0
      prevTimeRef.current = now
      if (n > 1 && !pausedRef.current) angleRef.current += SPIN_SPEED * dt

      let frontIdx = 0
      let maxZ = -Infinity

      for (let i = 0; i < n; i++) {
        const theta = angleRef.current + (i * 2 * Math.PI) / n
        const x = n === 1 ? 0 : Math.sin(theta) * RADIUS_X
        const z = n === 1 ? 1 : Math.cos(theta)
        const t2 = (z + 1) / 2
        const opacity = n === 1 ? 1 : 0.45 + 0.55 * t2
        const zIndex = Math.round(t2 * 100)

        if (z > maxZ) { maxZ = z; frontIdx = i }

        const el = cardRefs.current[i]
        if (el) {
          el.style.transform = `translateX(${x}px)`
          el.style.opacity = String(opacity)
          el.style.zIndex = String(zIndex)
        }
      }

      if (frontIdx !== activeIdxRef.current) {
        // Quitar borde al anterior
        const prevInner = innerCardRefs.current[activeIdxRef.current]
        if (prevInner) prevInner.classList.remove('char-card--selected')
        // Poner borde al nuevo
        const nextInner = innerCardRefs.current[frontIdx]
        if (nextInner) nextInner.classList.add('char-card--selected')

        activeIdxRef.current = frontIdx
        onActiveChange(frontIdx)
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [n, onActiveChange])

  return (
    <div style={{ position: 'relative', width: '100%', height: CARD_H + 40, overflow: 'visible' }}>
      {items.map((item, i) => (
        <div
          key={item.id}
          ref={el => { cardRefs.current[i] = el }}
          style={{
            position: 'absolute',
            width: CARD_W,
            height: CARD_H,
            left: `calc(50% - ${CARD_W / 2}px)`,
            top: '50%',
            marginTop: -CARD_H / 2,
            opacity: 0,
            willChange: 'transform, opacity',
          }}
        >
          <div
            ref={el => { innerCardRefs.current[i] = el }}
            className="char-card"
            style={{ '--char-color': item.color, width: '100%', height: '100%' } as React.CSSProperties}
          >
            <div className="char-card-glow" style={{ boxShadow: `0 0 60px ${item.color}55` }} />
            <div className="char-card-label">
              <span style={{ color: item.color }}>{item.label}</span>
              <span className="char-card-hint">🖱 {hint}</span>
            </div>
            <CardScene id={item.id} />
          </div>
        </div>
      ))}
    </div>
  )
}

interface Props { character: CharacterData }

export default function CharacterPage({ character }: Props) {
  const { lang, t } = useLang()
  const [activeIdx, setActiveIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const handleActiveChange = useCallback((idx: number) => setActiveIdx(idx), [])

  const name    = lang === 'es' ? character.nameEs    : character.nameEn
  const origin  = lang === 'es' ? character.originEs  : character.originEn
  const history = lang === 'es' ? character.historyEs : character.historyEn
  const skills  = lang === 'es' ? character.skillsEs  : character.skillsEn
  const creator = lang === 'es' ? character.creatorEs : character.creatorEn
  const gameTitle = lang === 'es' ? character.gameTitleEs : character.gameTitleEn
  const gameDesc  = lang === 'es' ? character.gameDescEs  : character.gameDescEn

  // Items del carrusel
  const carouselItems: CarouselItem[] = [
    { id: character.id, label: name, color: character.color },
    ...(character.id === 'mario' ? [
      { id: 'hongo', label: t('Super Hongo', 'Super Mushroom'), color: '#E52521' },
      { id: 'cubo',  label: t('Bloque ?', 'Question Block'),    color: '#F7A400' },
      { id: 'bowser', label: 'Bowser', color: '#4CAF50' },
      { id: 'peach', label: t('Princesa Peach', 'Princess Peach'), color: '#FF80B0' },
      { id: 'luigi', label: 'Luigi', color: '#43A047' },
      { id: 'yoshi', label: 'Yoshi', color: '#66BB6A' },
    ] : []),
    ...(character.id === 'pacman' ? [
      { id: 'inky',   label: 'Inky',   color: '#00BCD4' },
      { id: 'blinky', label: 'Blinky', color: '#F44336' },
      { id: 'clyde',  label: 'Clyde',  color: '#FF9800' },
      { id: 'pinky',  label: 'Pinky',  color: '#F48FB1' },
    ] : []),
    ...(character.id === 'crash' ? [
      { id: 'neo_cortex',  label: t('Dr. Neo Cortex', 'Dr. Neo Cortex'),   color: '#FFEB3B' },
      { id: 'nitrus_brio', label: t('Dr. Nitrus Brio', 'Dr. Nitrus Brio'), color: '#66BB6A' },
      { id: 'n_gin',       label: t('N. Gin', 'N. Gin'),                   color: '#90A4AE' },
      { id: 'uka_uka',     label: 'Uka Uka',                               color: '#8D6E63' },
      { id: 'n_tropy',     label: t('N. Tropy', 'N. Tropy'),               color: '#CE93D8' },
    ] : []),
  ]

  // Descripción según card activa
  interface DescData { tag: string; title: string; color: string; body: ReactNode }
  const descriptions: DescData[] = [
    {
      tag: t('Personaje icónico', 'Iconic Character'),
      title: name,
      color: character.color,
      body: (
        <>
          <span className="char-origin-badge">📍 {origin}</span>
          <div className="char-divider" />
          <div className="char-section">
            <h2 className="char-section-title">{t('Historia', 'History')}</h2>
            <p className="char-history">{history}</p>
          </div>
          <div className="char-section">
            <h2 className="char-section-title">{t('Habilidades', 'Skills')}</h2>
            <ul className="char-skills">{skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
          <div className="char-divider" />
          <div className="char-creator-card">
            {creator.split('·').map((part, i) => {
              const [label, value] = part.trim().split(':').map(s => s.trim())
              return <p key={i}>{value ? <><strong>{label}:</strong> {value}</> : part.trim()}</p>
            })}
          </div>
        </>
      ),
    },
    ...(character.id === 'mario' ? [
      {
        tag: 'Power-Up',
        title: t('Super Hongo', 'Super Mushroom'),
        color: '#E52521',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'El Super Hongo es el power-up más icónico de Mario. Al recogerlo, Mario crece al doble de tamaño convirtiéndose en Super Mario. Puede romper bloques de ladrillo y resistir un golpe de enemigo sin morir.',
                "The Super Mushroom is Mario's most iconic power-up. When collected, Mario grows to double his size becoming Super Mario. He can break brick blocks and withstand one enemy hit without dying.",
              )}
            </p>
          </div>
        ),
      },
      {
        tag: t('Objeto', 'Item'),
        title: t('Bloque Interrogación', 'Question Block'),
        color: '#F7A400',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'El Bloque ? es uno de los elementos más icónicos del universo Mario. Al golpearlo por abajo, libera monedas, power-ups o incluso una estrella de invencibilidad. Aparece en casi todos los juegos de la saga desde Super Mario Bros. (1985).',
                'The Question Block is one of the most iconic elements in the Mario universe. When hit from below, it releases coins, power-ups, or even an invincibility star. It appears in almost every game in the series since Super Mario Bros. (1985).',
              )}
            </p>
          </div>
        ),
      },
      {
        tag: t('Villano', 'Villain'),
        title: 'Bowser',
        color: '#4CAF50',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'Bowser, el Rey Koopa, es el villano principal de la saga Mario. Desde su debut en Super Mario Bros. (1985) ha secuestrado a la Princesa Peach en innumerables ocasiones. Con su ejército de Koopas y Goombas, representa el mayor enemigo del Reino Champiñón.',
                'Bowser, the Koopa King, is the main villain of the Mario series. Since his debut in Super Mario Bros. (1985) he has kidnapped Princess Peach countless times. With his army of Koopas and Goombas, he represents the greatest enemy of the Mushroom Kingdom.',
              )}
            </p>
          </div>
        ),
      },
      {
        tag: t('Personaje', 'Character'),
        title: t('Princesa Peach', 'Princess Peach'),
        color: '#FF80B0',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'La Princesa Peach Toadstool es la gobernante del Reino Champiñón y la damisela en apuros más famosa de los videojuegos. Debutó en Super Mario Bros. (1985). Aunque suele ser rescatada por Mario, en Super Princess Peach (2005) es ella quien salva al fontanero.',
                'Princess Peach Toadstool is the ruler of the Mushroom Kingdom and the most famous damsel in distress in video games. She debuted in Super Mario Bros. (1985). Although she is usually rescued by Mario, in Super Princess Peach (2005) she is the one who saves the plumber.',
              )}
            </p>
          </div>
        ),
      },
      {
        tag: t('Personaje', 'Character'),
        title: 'Luigi',
        color: '#43A047',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'Luigi es el hermano menor de Mario y el segundo jugador icónico de la saga. Debutó en Mario Bros. (1983). Más alto y delgado que Mario, es conocido por su cobardía y su amor por los fantasmas — algo irónico dado que protagonizó Luigi\'s Mansion (2001), donde debe rescatar a Mario del Castillo Fantasma.',
                "Luigi is Mario's younger brother and the iconic second player of the series. He debuted in Mario Bros. (1983). Taller and slimmer than Mario, he is known for his cowardice and love of ghosts — ironic given that he starred in Luigi's Mansion (2001), where he must rescue Mario from the Ghost Castle.",
              )}
            </p>
          </div>
        ),
      },
      {
        tag: t('Personaje', 'Character'),
        title: 'Yoshi',
        color: '#66BB6A',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'Yoshi es el dinosaurio montable más famoso de los videojuegos. Debutó en Super Mario World (1990) para SNES como fiel compañero de Mario. Puede comerse enemigos con su larga lengua, lanzar huevos y planear brevemente en el aire. Ha protagonizado su propia saga desde Yoshi\'s Island (1995).',
                "Yoshi is the most famous rideable dinosaur in video games. He debuted in Super Mario World (1990) for SNES as Mario's loyal companion. He can eat enemies with his long tongue, throw eggs, and briefly glide through the air. He has starred in his own series since Yoshi's Island (1995).",
              )}
            </p>
          </div>
        ),
      },
    ] : []),
    ...(character.id === 'pacman' ? [
      // orden igual que carouselItems: inky, blinky, clyde
      {
        tag: t('Fantasma', 'Ghost'),
        title: 'Inky',
        color: '#00BCD4',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'Inky es el fantasma cian de Pac-Man, considerado el más impredecible de los cuatro. Su comportamiento de persecución depende tanto de la posición de Pac-Man como de Blinky, lo que lo hace difícil de anticipar. Su nombre proviene del término inglés "inky" (manchado de tinta). Aparece en todos los juegos de la saga desde 1980.',
                'Inky is the cyan ghost in Pac-Man, considered the most unpredictable of the four. His pursuit behavior depends on both Pac-Man\'s position and Blinky\'s, making him difficult to anticipate. His name comes from the English word "inky" (stained with ink). He appears in every game in the series since 1980.',
              )}
            </p>
          </div>
        ),
      },
      {
        tag: t('Fantasma', 'Ghost'),
        title: 'Blinky',
        color: '#F44336',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'Blinky es el fantasma rojo y el líder de los cuatro fantasmas de Pac-Man. Es el más agresivo: persigue directamente a Pac-Man sin descanso. A medida que el jugador come más puntos, Blinky aumenta su velocidad, convirtiéndose en "Cruise Elroy". Es el antagonista principal de la saga desde 1980.',
                'Blinky is the red ghost and the leader of Pac-Man\'s four ghosts. He is the most aggressive: he directly chases Pac-Man relentlessly. As the player eats more dots, Blinky increases his speed, becoming "Cruise Elroy". He is the main antagonist of the series since 1980.',
              )}
            </p>
          </div>
        ),
      },
      {
        tag: t('Fantasma', 'Ghost'),
        title: 'Clyde',
        color: '#FF9800',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'Clyde es el fantasma naranja y el más errático del grupo. Su comportamiento alterna entre perseguir a Pac-Man y huir hacia su esquina cuando se acerca demasiado, lo que lo hace impredecible. Su nombre japonés original es "Otoboke" (el torpe). A pesar de su aparente torpeza, puede sorprender al jugador desprevenido.',
                'Clyde is the orange ghost and the most erratic of the group. His behavior alternates between chasing Pac-Man and fleeing to his corner when he gets too close, making him unpredictable. His original Japanese name is "Otoboke" (the slow one). Despite his apparent clumsiness, he can surprise the unwary player.',
              )}
            </p>
          </div>
        ),
      },
      {
        tag: t('Fantasma', 'Ghost'),
        title: 'Pinky',
        color: '#F48FB1',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'Pinky es la fantasma rosa de Pac-Man, conocida por su estrategia de emboscada. En lugar de perseguir directamente, apunta 4 casillas por delante de la dirección de Pac-Man para cortarle el paso. Su nombre japonés es "Machibuse" (emboscada). Es el único fantasma con género femenino y aparece desde el juego original de 1980.',
                'Pinky is the pink ghost in Pac-Man, known for her ambush strategy. Instead of directly chasing, she targets 4 tiles ahead of Pac-Man\'s direction to cut him off. Her Japanese name is "Machibuse" (ambush). She is the only ghost with a female gender and has appeared since the original 1980 game.',
              )}
            </p>
          </div>
        ),
      },
    ] : []),
    ...(character.id === 'crash' ? [
      // orden igual que carouselItems: neo_cortex, nitrus_brio, n_gin, uka_uka, n_tropy
      {
        tag: t('Villano', 'Villain'),
        title: 'Dr. Neo Cortex',
        color: '#FFEB3B',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'El Dr. Neo Cortex es el antagonista principal de la saga. Científico brillante pero inestable, creó a Crash con su Evolvo-Ray con la intención de formar un ejército de animales mutados para conquistar el mundo. Tiene una "N" tatuada en la frente y su gran cabeza es símbolo de su ego desmedido.',
                'Dr. Neo Cortex is the main antagonist of the series. A brilliant but unstable scientist, he created Crash with his Evolvo-Ray intending to build an army of mutated animals to conquer the world. He has an "N" tattooed on his forehead and his large head is a symbol of his immense ego.',
              )}
            </p>
          </div>
        ),
      },
      {
        tag: t('Villano', 'Villain'),
        title: 'Dr. Nitrus Brio',
        color: '#66BB6A',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'El Dr. Nitrus Brio es el asistente de laboratorio del Dr. Cortex y creador de la Mutagen Formula. Es nervioso, torpe y tiene problemas con el alcohol. Lleva una serie de beakers con líquidos de colores que usa como armas. Aparece en Crash Bandicoot (1996) y Crash Bandicoot 2 (1997).',
                'Dr. Nitrus Brio is Dr. Cortex\'s lab assistant and creator of the Mutagen Formula. He is nervous, clumsy and has issues with alcohol. He carries a series of colored-liquid beakers he uses as weapons. He appears in Crash Bandicoot (1996) and Crash Bandicoot 2 (1997).',
              )}
            </p>
          </div>
        ),
      },
      {
        tag: t('Villano', 'Villain'),
        title: 'N. Gin',
        color: '#90A4AE',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'N. Gin es el mecánico y científico de combate del Dr. Cortex. Tiene un cohete misil incrustado en la cabeza que no explotó, y eso lo volvió parcialmente robótico. Sirve como jefe en Crash Bandicoot 2 y Warped. Es leal a Cortex y altamente inteligente en ingeniería de combate.',
                'N. Gin is Dr. Cortex\'s combat scientist and mechanic. He has a missile rocket embedded in his head that didn\'t explode, which turned him partially robotic. He serves as a boss in Crash Bandicoot 2 and Warped. He is loyal to Cortex and highly intelligent in combat engineering.',
              )}
            </p>
          </div>
        ),
      },
      {
        tag: t('Villano', 'Villain'),
        title: 'Uka Uka',
        color: '#8D6E63',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'Uka Uka es una máscara ancestral maligna, hermano gemelo del benévolo Aku Aku. Estuvo encerrado bajo tierra durante miles de años hasta que el Dr. Cortex lo liberó accidentalmente. Es considerado el mal supremo de la saga y el verdadero amo del Dr. Cortex. Aparece desde Crash Bandicoot: Warped (1998).',
                'Uka Uka is an evil ancient mask, the evil twin of the benevolent Aku Aku. He was imprisoned underground for thousands of years until Dr. Cortex accidentally freed him. He is considered the supreme evil of the series and the true master of Dr. Cortex. He appears from Crash Bandicoot: Warped (1998) onward.',
              )}
            </p>
          </div>
        ),
      },
      {
        tag: t('Villano', 'Villain'),
        title: 'N. Tropy',
        color: '#CE93D8',
        body: (
          <div className="char-section">
            <p className="char-history">
              {t(
                'N. Tropy es el maestro del tiempo y villano en Crash Bandicoot: Warped (1998). Construyó la máquina del tiempo para Uka Uka y Cortex, y utiliza un diapasón gigante como arma. Habla con un acento aristocrático exagerado y se considera superior a todos. Regresa como villano principal en Crash Bandicoot 4 (2020).',
                'N. Tropy is the master of time and villain in Crash Bandicoot: Warped (1998). He built the time machine for Uka Uka and Cortex, and wields a giant tuning fork as a weapon. He speaks with an exaggerated aristocratic accent and considers himself superior to all. He returns as the main villain in Crash Bandicoot 4 (2020).',
              )}
            </p>
          </div>
        ),
      },
    ] : []),
  ]

  const desc = descriptions[activeIdx] ?? descriptions[0]

  return (
    <div
      className="page char-card-page"
      style={{
        '--char-color': character.color,
        ...(character.id === 'mario' && {
          backgroundImage: 'url(/fondo_mario.jpg)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }),
        ...(character.id === 'pacman' && {
          backgroundImage: 'url(/pacman-wall.jpg)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }),
        ...(character.id === 'crash' && {
          backgroundImage: 'url(/crashs_fondo.webp)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }),
      } as React.CSSProperties}
      onClick={() => setPaused(false)}
    >
      <div className="three-col-layout">
        {/* Columna izquierda: nombre y descripción del juego */}
        <div className="col-left">
          <p className="game-header-tag">{t('Videojuego', 'Video Game')}</p>
          <h1 className="game-header-title" style={{ color: character.color }}>{gameTitle}</h1>
          <p className="game-header-desc">{gameDesc}</p>

          {/* Datos extra exclusivos de la columna izquierda — no están en los cards */}
          {character.id === 'pacman' && (
            <>
              <div className="char-divider" style={{ margin: '6px 0' }} />
              <p className="game-header-tag" style={{ marginBottom: 3 }}>{t('Récords & Datos', 'Records & Facts')}</p>
              <ul style={{ paddingLeft: 14, margin: '0 0 8px 0' }}>
                {(lang === 'es' ? [
                  'Primer arcade en generar más de $1.000 millones (Guinness)',
                  'Estimado en 10.000 millones de partidas jugadas',
                  'Símbolo cultural global de la década de 1980',
                ] : [
                  'First arcade to generate over $1 billion in revenue (Guinness)',
                  'Estimated at 10 billion plays worldwide',
                  'Global cultural symbol of the 1980s',
                ]).map((fact, i) => (
                  <li key={i} className="game-header-desc" style={{ fontSize: '0.78rem', lineHeight: 1.5, marginBottom: 3 }}>{fact}</li>
                ))}
              </ul>
              <p className="game-header-tag" style={{ marginBottom: 3 }}>{t('Curiosidades', 'Fun Facts')}</p>
              <ul style={{ paddingLeft: 14, margin: 0 }}>
                {(lang === 'es' ? [
                  'Su nombre original era "Puck-Man", cambiado en EE. UU. por vandalismo',
                  'Primer videojuego dirigido tanto a hombres como a mujeres',
                  'El nivel 256 tiene un bug que corrompe la pantalla ("kill screen")',
                ] : [
                  'Originally named "Puck-Man", changed in the US to prevent vandalism',
                  'First video game equally aimed at men and women',
                  'Level 256 has a bug that corrupts the screen ("kill screen")',
                ]).map((fact, i) => (
                  <li key={i} className="game-header-desc" style={{ fontSize: '0.78rem', lineHeight: 1.5, marginBottom: 3 }}>{fact}</li>
                ))}
              </ul>
            </>
          )}

          {character.id === 'mario' && (
            <>
              <div className="char-divider" style={{ margin: '6px 0' }} />
              <p className="game-header-tag" style={{ marginBottom: 3 }}>{t('Récords & Datos', 'Records & Facts')}</p>
              <ul style={{ paddingLeft: 14, margin: '0 0 8px 0' }}>
                {(lang === 'es' ? [
                  'Personaje más reconocido del mundo en videojuegos (Guinness 2010)',
                  'Más de 800 millones de copias vendidas en toda la saga',
                  'La franquicia más vendida en la historia del gaming',
                ] : [
                  'Most recognized video game character in the world (Guinness 2010)',
                  'Over 800 million copies sold across the entire franchise',
                  'Best-selling franchise in gaming history',
                ]).map((fact, i) => (
                  <li key={i} className="game-header-desc" style={{ fontSize: '0.78rem', lineHeight: 1.5, marginBottom: 3 }}>{fact}</li>
                ))}
              </ul>
              <p className="game-header-tag" style={{ marginBottom: 3 }}>{t('Curiosidades', 'Fun Facts')}</p>
              <ul style={{ paddingLeft: 14, margin: 0 }}>
                {(lang === 'es' ? [
                  'Originalmente se llamaba "Jumpman" en Donkey Kong (1981)',
                  'Su bigote existe porque los gráficos de 8 bits no permitían dibujar boca',
                  'El "¡It\'s-a me, Mario!" fue improvisado por Charles Martinet en la audición',
                ] : [
                  'Originally called "Jumpman" in Donkey Kong (1981)',
                  'His mustache exists because 8-bit graphics couldn\'t render a mouth',
                  '"It\'s-a me, Mario!" was improvised by Charles Martinet at the audition',
                ]).map((fact, i) => (
                  <li key={i} className="game-header-desc" style={{ fontSize: '0.78rem', lineHeight: 1.5, marginBottom: 3 }}>{fact}</li>
                ))}
              </ul>
            </>
          )}

          {character.id === 'crash' && (
            <>
              <div className="char-divider" style={{ margin: '6px 0' }} />
              <p className="game-header-tag" style={{ marginBottom: 3 }}>{t('Récords & Datos', 'Records & Facts')}</p>
              <ul style={{ paddingLeft: 14, margin: '0 0 8px 0' }}>
                {(lang === 'es' ? [
                  'Vendió más de 40 millones de copias en toda la franquicia',
                  'Mascota no oficial de PlayStation durante los años 90',
                  'N. Sane Trilogy (2017) fue el juego más vendido de ese año en PS4',
                ] : [
                  'Over 40 million copies sold across the franchise',
                  'Unofficial PlayStation mascot throughout the 1990s',
                  'N. Sane Trilogy (2017) was the best-selling PS4 game of that year',
                ]).map((fact, i) => (
                  <li key={i} className="game-header-desc" style={{ fontSize: '0.78rem', lineHeight: 1.5, marginBottom: 3 }}>{fact}</li>
                ))}
              </ul>
              <p className="game-header-tag" style={{ marginBottom: 3 }}>{t('Curiosidades', 'Fun Facts')}</p>
              <ul style={{ paddingLeft: 14, margin: 0 }}>
                {(lang === 'es' ? [
                  'Naughty Dog lo diseñó como "Sony\'s Mascot" para competir con Mario y Sonic',
                  'Su nombre original de desarrollo era "Willie the Wombat"',
                  'Aku Aku, la máscara aliada, habla en un idioma completamente inventado',
                ] : [
                  'Naughty Dog designed him as "Sony\'s Mascot" to compete with Mario and Sonic',
                  'His original development name was "Willie the Wombat"',
                  'Aku Aku, the ally mask, speaks in a completely invented language',
                ]).map((fact, i) => (
                  <li key={i} className="game-header-desc" style={{ fontSize: '0.78rem', lineHeight: 1.5, marginBottom: 3 }}>{fact}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Columna central: carrusel */}
        <div className="col-center" onClick={e => { e.stopPropagation(); setPaused(true) }}>
          <Carousel3D items={carouselItems} onActiveChange={handleActiveChange} paused={paused} hint={t('Arrastra para girar', 'Drag to rotate')} />
        </div>

        {/* Columna derecha: descripción de la card activa */}
        <div className="col-right">
          <div className="char-desc-panel char-desc-panel--visible">
            <div className="char-desc-inner" key={activeIdx}>
              <p className="char-tag">{desc.tag}</p>
              <h1 className="char-name" style={{ color: desc.color }}>{desc.title}</h1>
              {desc.body}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
