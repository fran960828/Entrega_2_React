import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// 1. Creamos una instancia del QueryClient con configuraciones por defecto
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Evita que se re-lanze la petición al cambiar de ventana (foco)
      refetchOnWindowFocus: false, 
      // Tiempo en milisegundos que los datos se consideran "frescos" (ej. 5 min)
      staleTime: 1000 * 60 * 5,
      // Intentos fallidos antes de mostrar error
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
