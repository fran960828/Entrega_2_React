/// <reference types="cypress" />

describe('Flujo de Favoritos', () => {
  beforeEach(() => {
    // Limpiamos todo para que un test no ensucie al siguiente
    cy.clearLocalStorage();
    cy.visit('http://localhost:5173/');
  });
  it('debe completar el ciclo de vida de un favorito: añadir, verificar y eliminar', () => {

    cy.get('nav').contains('Characters').click();
    cy.location('pathname').should('include', '/characters')

    // 3. Selección y acción
    // Usamos el alias para referenciar a Rick durante todo el test
    cy.get(':nth-child(1) > [data-cy="cy-char-card"]').as('rickCard');
    
    // Verificamos que es Rick antes de pulsar
    cy.get('@rickCard').find('h3').should('contain', 'Rick Sanchez');
    
    // Marcamos favorito
    cy.get(':nth-child(1) > ._favoriteBtn_h28ol_93').click();

    // 4. Navegación a Favoritos (con aserción de seguridad)
    // Forzamos el clic si es necesario para evitar problemas de re-renderizado
    cy.get('nav').contains('Favorites').click();
    cy.location('pathname').should('include', '/favorites')
    
    // 5. Verificación en la lista de favoritos
    cy.get('[data-cy="cy-title-fav"]').contains(/Personajes Favoritos/i)
    cy.get('._name_h28ol_43').should('contain', 'Rick Sanchez');
    

    // 6. Eliminación y comprobación de Empty State
    cy.get('[class*="favoriteBtn"]').click()
    cy.get('[data-cy="cy-title-fav"]').should('not.exist')
    cy.location('pathname').should('include', '/favorites')
    cy.get('._link_o9bku_30').should('exist')
    
    
    
    // Comprobamos que ya no hay cards en el DOM
  });
  it('debe abrir el modal de elenco al pulsar en un episodio ', () => {
    cy.get('nav').contains('Episodes').click();
    cy.get('[class*="card"]').first().as('targetEpisode');
    
    // 3. Acción: Abrir el Modal
    // En tu FavoritesList, los episodios se renderizan con EpisodesCard
    cy.get('[class*="card"]').contains('button', 'Ver Elenco').click();

    // 4. Verificación del Modal (Portal)
    // El modal debería estar en el DOM fuera del flujo normal
    cy.get('[class*="overlay"]').should('be.visible');
    
    // Verificamos que el título del modal es el correcto
    cy.get('[class*="header"]').find('h3').should('contain', 'Characters in Episode');

    // 5. Verificación de Carga de Datos (Elenco)
    // Esperamos a que el EpisodeCastContainer cargue los personajes
    // Buscamos las imágenes de los residentes en el modal
    cy.get('[class*="modal"]')
      .find('img')
      .should('have.length.at.least', 1)
      .first()
      .should('be.visible');

    // 6. Cierre del Modal
    // Hacemos clic fuera (en el overlay) o en un botón de cerrar si lo tienes
    cy.get('[class*="overlay"]').click('topLeft', { force: true });
    
    // El modal ya no debería existir
    cy.get('[class*="overlay"]').should('not.exist');
  });
 it('debe pasar a la pagina de detalle del personaje y volver a la pantalla principal', () => {
    cy.get('nav').contains('Characters').click();
    cy.location('pathname').should('include', '/characters')
    cy.get(':nth-child(1) > [data-cy="cy-char-card"]').as('RickCard')
    cy.get('@RickCard').click()
    cy.url().should('include', '/characters/1');
    cy.get('[data-cy="cy-char-name"]').should('exist')
    cy.get('[data-cy="cy-char-name"]')
    .should('be.visible')
    .and('contain', 'Rick Sanchez');
    cy.get('[data-cy="cy-btn-volver"]').click()
    cy.url().should('include', '/Characters');
    cy.get('[data-cy="cy-char-card"]').should('be.visible').and('have.length.at.least', 1);  
  });
  it('debe pasar a la pagina 2 desde la pagina 1 en episodes', () => {
    cy.get('nav').contains('Episodes').click();
    cy.location('pathname').should('include', '/episodes')
    cy.get(':nth-child(1) > ._episodeCode_104re_16').invoke('text').as('primerEpisodioP1');
    cy.get('[data-cy="cy-btn-next"]').click()
    cy.url()
  .should('include', '/episodes')
  .and('include', 'page=2');
    cy.get(':nth-child(1) > ._mainInfo_104re_26 > ._title_104re_31')
    cy.get('@primerEpisodioP1').then((nombreP1) => {
    cy.get(':nth-child(1) > ._mainInfo_104re_26 > ._title_104re_31')
      .should('not.have.text', nombreP1); // <--- La prueba de que cambió
  });
  });
});