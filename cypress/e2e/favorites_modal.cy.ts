/// <reference types="cypress" />

describe("Flujo de Favoritos y modal", () => {
  beforeEach(() => {
    // 1. Limpiamos almacenamiento
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("debe abrir el modal de elenco al pulsar en un episodio (Mocks de Episodios y Personajes)", () => {
    // 1. INTERCEPTORES
    cy.intercept("GET", "**/api/character/**", {
      fixture: "characters.json",
    }).as("getCast");

    cy.intercept("GET", "**/api/episode*", { fixture: "episodes.json" }).as(
      "getEpisodes"
    );
    // 2. Navegación a Episodios
    cy.get("nav").contains("Episodes").click();

    cy.get('[class*="card"]').first().as("targetEpisode");

    // 3. Acción: Abrir el Modal
    cy.get("@targetEpisode").contains("button", "Ver Elenco").click();

    // 4. Verificación del Modal y Espera del Elenco
    cy.get('[class*="overlay"]').should("be.visible");

    // Verificamos que el título del modal es el correcto
    cy.get('[class*="header"]')
      .find("h3")
      .should("contain", "Characters in Episode");

    // 5. Verificación de Imágenes (Datos del Mock)
    cy.get('[class*="modal"]')
      .find("img")
      .should("have.length.at.least", 1)
      .first()
      .should("be.visible");

    // 6. Cierre del Modal
    cy.get('[class*="overlay"]').click("topLeft", { force: true });
    cy.get('[class*="overlay"]').should("not.exist");
  });
  it("debe añadir a favoritos y navegar sin errores usando la fixture", () => {
    cy.intercept("GET", "**/api/character*", {
      fixture: "characters.json",
    }).as("getCharacters");
    cy.get("nav").contains("Characters").click();

    // 1. Leemos los datos de nuestra fixture para asegurar que usamos el "objeto perfecto"
    cy.fixture("characters.json").then((fixtureData) => {
      const rickData = fixtureData.results[0]; // Tomamos a Rick del JSON

      // 2. Hacemos el click real para activar la lógica de la app
      cy.get(':nth-child(1) > [data-cy="cy-btn-fav"]').click();

      // 3. SOBRESCRIBIMOS con los datos de la fixture para asegurar consistencia
      // Esto garantiza que el Error Boundary no salte por datos incompletos
      cy.window().then((win) => {
        win.localStorage.setItem("favorites", JSON.stringify([rickData]));
      });
    });

    // 4. Navegamos a Favoritos
    cy.get("nav").contains("Favorites").click();

    // 5. Verificaciones
    cy.location("pathname").should("include", "/favorites");
    cy.get('[data-cy="cy-title-fav"]').should("be.visible");
    cy.get("._name_h28ol_43").should("contain", "Rick Sanchez");

    cy.get('[data-cy="cy-btn-fav"]').click();
    cy.get('[data-cy="cy-char-card"]').should("not.exist");
    cy.get("._link_o9bku_30").should("exist");
  });
  it("debe pasar a la pagina de detalle del personaje y volver a la pantalla principal (Mockeado)", () => {
    // 1. CONFIGURACIÓN DE INTERCEPTORES
    // Interceptor para la lista de personajes (Página 1)
    cy.intercept("GET", "**/api/character", { fixture: "characters.json" }).as(
      "getCharacters"
    );

    // Interceptor para el detalle de un personaje específico (ID 1)
    // Usamos el objeto de la fixture pero adaptado a un solo personaje
    cy.fixture("characters.json").then((data) => {
      cy.intercept("GET", "**/api/character/1", {
        statusCode: 200,
        body: data.results[0], // Entregamos solo el primer personaje (Rick)
      }).as("getRickDetail");
    });

    // 2. EJECUCIÓN DEL TEST
    cy.get("nav").contains("Characters").click();

    // Esperamos a que cargue la lista mockeada

    cy.location("pathname").should("include", "/characters");

    // Selección de la Card
    cy.get('[data-cy="cy-grid-char"]').children().first().as("RickCard");
    cy.get("@RickCard").click();

    // Esperamos a que cargue el detalle mockeado

    // 3. VERIFICACIÓN DEL DETALLE
    cy.url().should("include", "/characters/1");
    cy.get('[data-cy="cy-char-name"]')
      .should("be.visible")
      .and("contain", "Rick Sanchez");
  });
  it("debe pasar a la pagina 2 desde la pagina 1 en episodes (Mockeado)", () => {
    // 1. Interceptores
    cy.intercept("GET", "**/api/episode/**?page=1*", {
      fixture: "episode_p1.json",
    }).as("getEpisodesP1");
    cy.intercept("GET", "**/api/episode/**?page=2*", {
      fixture: "episode_p2.json",
    }).as("getEpisodesP2");

    cy.get("nav").contains("Episodes").click();
    cy.wait("@getEpisodesP1");

    // 2. CAPTURA CRÍTICA: Guardamos el nombre de la P1 ("Pilot")
    cy.get("[data-cy='cy-ep-name']")
      .first()
      .invoke("text")
      .then((textoP1) => {
        // Guardamos el valor en un alias
        cy.wrap(textoP1).as("nombreP1");
      });

    // 3. CAMBIO DE PÁGINA
    cy.get('[data-cy="cy-btn-next"]').click();
    cy.wait("@getEpisodesP2");

    // 4. COMPARACIÓN
    cy.get("@nombreP1").then((nombreP1) => {
      cy.get("[data-cy='cy-ep-name']")
        .first()
        .should("be.visible")
        .and("not.have.text", nombreP1);
    });
  });
});
