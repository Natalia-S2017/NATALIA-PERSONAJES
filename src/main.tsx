import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import * as THREE from 'three'
import App from './App'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'

// Hace que Three.js busque assets con el base URL correcto en producción
const base = import.meta.env.BASE_URL
THREE.DefaultLoadingManager.setURLModifier((url) => {
  if (url.startsWith('/') && !url.startsWith('//')) {
    return base + url.slice(1)
  }
  return url
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={base}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
