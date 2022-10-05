describe("Home navigation", () => {
  it("should navigate to the login page", () => {
    cy.visit("/");

    cy.get('a[href*="/api/auth/signing"]').click();

    cy.url().should("include", "/login");

    cy.get("h1").contains("Accede a Lierno App");
  });

  it("should navigate to the registration page", () => {
    cy.visit("/");

    cy.get('a[href*="/register"]').click();

    cy.url().should("include", "/register");

    cy.get("h1").contains("Regístrate en Lierno App");
  });
});
