import { Routes, Route } from 'react-router-dom'
import IntroPage from './pages/IntroPage'
import CharacterPage from './pages/CharacterPage'
import CreditsPage from './pages/CreditsPage'
import NavMenu from './components/NavMenu'
import LanguageSelector from './components/LanguageSelector'
import { CHARACTERS } from './data/characters'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <LanguageSelector />
        <NavMenu />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/mario" element={<CharacterPage character={CHARACTERS.mario} />} />
          <Route path="/pacman" element={<CharacterPage character={CHARACTERS.pacman} />} />
          <Route path="/crash" element={<CharacterPage character={CHARACTERS.crash} />} />

          <Route path="/creditos" element={<CreditsPage />} />
        </Routes>
      </main>
    </div>
  )
}
