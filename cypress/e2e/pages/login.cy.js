describe("Login page", () => {
  describe("Layout", () => {
    before(() => {
      cy.visit("/login");
    });

    it("should have the username input", () => {
      cy.get("#username").should("exist");
    });

    it("should have the password input", () => {
      cy.get("#password").should("exist");
    });

    it("should have the submit button", () => {
      cy.get("button[type=submit]").should("exist");
    });

    it("should have the password recovery link", () => {
      cy.get('a[href*="/login"]').should("exist");
    });

    it("should have the registration link", () => {
      cy.get('a[href*="/register"]').should("exist");
    });
  });

  describe("Form completion", () => {
    before(() => {
      cy.visit("/login");
    });

    it("should have a disabled button when form is not filled", () => {
      cy.get("button[type=submit]").should("be.disabled");
    });

    it("should fill the username input", () => {
      cy.get("#username").type(Cypress.env("username")).should("have.value", Cypress.env("username"));
    });

    it("should fill the password input", () => {
      cy.get("#password").type(Cypress.env("password")).should("have.value", Cypress.env("password"));
    });

    it("should have an enabled button when form is filled", () => {
      cy.get("button[type=submit]").should("be.enabled");
    });

    it("should submit form when inputs are filled and correct", () => {
      cy.get("button[type=submit]").click();

      cy.url().should("include", "/characters");
    });
  });
});
