import { defineConfig } from "cypress";

export default defineConfig({
  // Desactivamos la protección de Chrome para evitar problemas con 
  // navegación entre dominios o redirects de seguridad internos
  chromeWebSecurity: false,
  
  // Aumentamos el tiempo de espera por defecto ya que las APIs externas
  // de Rick & Morty pueden ser lentas a veces
  defaultCommandTimeout: 4000,


  e2e: {
    baseUrl: "http://localhost:5173", // Así puedes usar cy.visit('/')
    viewportWidth: 1280,
    viewportHeight: 720,
    
    setupNodeEvents(on, config) {
      // Aquí puedes añadir plugins en el futuro
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
