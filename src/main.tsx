import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ExperienceProvider } from './experience/ExperienceProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExperienceProvider>
      <App />
    </ExperienceProvider>
  </StrictMode>,
)
