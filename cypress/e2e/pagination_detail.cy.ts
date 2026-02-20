/// <reference types="cypress" />

describe('Flujo de Pagina detalle y paginación', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('http://localhost:5173/');
  });
  afterEach(() => {
    cy.wait(5000); 
  });
  
 it('debe pasar a la pagina de detalle del personaje y volver a la pantalla principal', () => {
    cy.get('nav').contains('Characters').click();
    cy.location('pathname').should('include', '/characters')
    cy.get('[data-cy="cy-grid-char"]').children().first().as('RickCard')
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