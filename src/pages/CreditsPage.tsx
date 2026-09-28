import { useLang } from '../context/LanguageContext'

const references = [
  'Iwatani, T. (1980). Pac-Man [Videojuego]. Namco.',
  'Miyamoto, S. (1981). Donkey Kong [Videojuego]. Nintendo.',
  'Gavin, A., & Rubin, J. (1996). Crash Bandicoot [Videojuego]. Naughty Dog / Sony Computer Entertainment.',
  'Kent, S. L. (2001). The ultimate history of video games: From Pong to Pokémon and beyond. Three Rivers Press.',
  'Donovan, T. (2010). Replay: The history of video games. Yellow Ant.',
  'Nintendo. (2023). Historia de Mario. Nintendo Co., Ltd.',
  'Bandai Namco Entertainment. (2023). Pac-Man 40th anniversary.',
  'Activision. (2017). Crash Bandicoot N. Sane Trilogy [Videojuego]. Activision.',
]


export default function CreditsPage() {
  const { t } = useLang()

  return (
    <div className="page credits-page">
      <div className="credits-container">

        <div className="credits-hero">
          <p className="credits-eyebrow">UNAD · Fase 2 · 2026</p>
          <h1 className="credits-title">
            {t('Créditos y Referencias', 'Credits & References')}
          </h1>
          <p className="credits-lead">
            {t(
              'Proyecto académico de multimedia interactiva. Todos los personajes son propiedad de sus respectivos titulares.',
              'Academic interactive multimedia project. All characters are property of their respective owners.',
            )}
          </p>
        </div>

        {/* Detalles del proyecto */}
        <section className="credits-section">
          <h2 className="credits-section-title">{t('Sobre el proyecto', 'About the project')}</h2>
          <dl className="credits-grid">
            <div className="credits-kv">
              <dt>{t('Autora', 'Author')}</dt>
              <dd>Natalia</dd>
            </div>
            <div className="credits-kv">
              <dt>{t('Institución', 'Institution')}</dt>
              <dd>UNAD</dd>
            </div>
            <div className="credits-kv">
              <dt>{t('Tecnologías', 'Technologies')}</dt>
              <dd>React · Three.js · TypeScript · Vite</dd>
            </div>
            <div className="credits-kv">
              <dt>{t('Modelos 3D', '3D Models')}</dt>
              <dd>{t('GLB + geometría procedural', 'GLB + procedural geometry')}</dd>
            </div>
          </dl>
        </section>

        {/* Personajes */}
        <section className="credits-section">
          <h2 className="credits-section-title">{t('Personajes', 'Characters')}</h2>
          <ul className="credits-chars">
            <li>
              <strong style={{ color: '#E52521' }}>Mario</strong> —{' '}
              {t('© Nintendo Co., Ltd. 1981. Creado por Shigeru Miyamoto.', '© Nintendo Co., Ltd. 1981. Created by Shigeru Miyamoto.')}
            </li>
            <li>
              <strong style={{ color: '#FFE000' }}>Pac-Man</strong> —{' '}
              {t('© Bandai Namco Entertainment Inc. 1980. Creado por Toru Iwatani.', '© Bandai Namco Entertainment Inc. 1980. Created by Toru Iwatani.')}
            </li>
            <li>
              <strong style={{ color: '#F97316' }}>Crash Bandicoot</strong> —{' '}
              {t('© Activision / Naughty Dog 1996. Creado por Andy Gavin y Jason Rubin.', '© Activision / Naughty Dog 1996. Created by Andy Gavin and Jason Rubin.')}
            </li>
          </ul>
          <p className="credits-disclaimer">
            {t(
              'Este proyecto es estrictamente académico y sin fines comerciales.',
              'This project is strictly academic and non-commercial.',
            )}
          </p>
        </section>

        {/* Modelos 3D */}
        <section className="credits-section">
          <h2 className="credits-section-title">{t('Modelos 3D', '3D Models')}</h2>
          <p className="credits-lead" style={{ fontSize: '0.9rem' }}>
            {t(
              'Los modelos 3D utilizados en esta aplicación fueron obtenidos de Sketchfab (sketchfab.com), plataforma de distribución de modelos 3D. Se utilizaron bajo sus respectivas licencias para uso educativo y no comercial.',
              'The 3D models used in this application were obtained from Sketchfab (sketchfab.com), a 3D model distribution platform. They were used under their respective licenses for educational and non-commercial use.',
            )}
          </p>
          <ul className="credits-chars" style={{ marginTop: 10 }}>
            <li>{t('Mario, Luigi, Princesa Peach, Bowser, Yoshi, Super Hongo, Bloque ? — Serie Super Mario Bros. © Nintendo', 'Mario, Luigi, Princess Peach, Bowser, Yoshi, Super Mushroom, Question Block — Super Mario Bros. series © Nintendo')}</li>
            <li>{t('Pac-Man, Blinky, Inky, Clyde, Pinky — Serie Pac-Man © Bandai Namco Entertainment', 'Pac-Man, Blinky, Inky, Clyde, Pinky — Pac-Man series © Bandai Namco Entertainment')}</li>
            <li>{t('Crash Bandicoot, Dr. Neo Cortex, Dr. Nitrus Brio, N. Gin, Uka Uka, N. Tropy — Serie Crash Bandicoot © Activision / Naughty Dog', 'Crash Bandicoot, Dr. Neo Cortex, Dr. Nitrus Brio, N. Gin, Uka Uka, N. Tropy — Crash Bandicoot series © Activision / Naughty Dog')}</li>
          </ul>
        </section>

        {/* Referencias APA */}
        <section className="credits-section">
          <h2 className="credits-section-title">
            {t('Referencias bibliográficas — APA 7.ª ed.', 'Bibliographic References — APA 7th ed.')}
          </h2>
          <ol className="credits-refs">
            {references.map((ref, i) => <li key={i}>{ref}</li>)}
          </ol>
        </section>

      </div>
    </div>
  )
}
