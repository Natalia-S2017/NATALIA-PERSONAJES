import { useLang } from '../context/LanguageContext'

export default function LanguageSelector() {
  const { lang, setLang } = useLang()

  return (
    <div className="lang-selector">
      <button
        className={`lang-btn${lang === 'es' ? ' active' : ''}`}
        onClick={() => setLang('es')}
      >
        🇨🇴 ES
      </button>
      <span className="lang-divider">|</span>
      <button
        className={`lang-btn${lang === 'en' ? ' active' : ''}`}
        onClick={() => setLang('en')}
      >
        🇺🇸 EN
      </button>
    </div>
  )
}
