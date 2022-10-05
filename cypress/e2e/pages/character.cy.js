describe("Character", () => {
  describe("Character list", () => {
    before(() => {
      cy.login();
      cy.visit("/characters");
      cy.wait("@session");
    });

    it("should render the page", () => {
      cy.get("main h1").should("have.text", "Personajes");
    });

    it("should have character and npc tabs", () => {
      cy.get("button#simple-tab-1").should("have.text", "NPCs").click().url().should("include", "step=1");
      cy.get("button#simple-tab-0").should("have.text", "Personajes").click().url().should("include", "step=0");
    });

    it("should have the menu buttons", () => {
      cy.get('button>svg[data-testid="GridViewIcon"]').should("exist");
      cy.get('button>svg[data-testid="UploadFileIcon"]').should("exist");
      cy.get('button>svg[data-testid="AddIcon"]').should("exist");
    });

    it("should be able to search", () => {
      cy.get("input[type=text]").type("Ament");
      cy.get("h6.MuiTypography-subtitle1").should("have.text", "Ament Fordye");
    });

    it("should include the table buttons", () => {
      cy.get('button>[data-testid="EditIcon"').should("have.length", 1);
      cy.get('button>[data-testid="DeleteIcon"').should("have.length", 1);
    });

    it("should navigate to the character profile", () => {
      cy.get("h6.MuiTypography-subtitle1").click();

      cy.url().should("include", "/characters/");
    });
  });

  describe("Character profile", () => {
    describe("Character header", () => {
      it("should have the character name", () => {
        cy.get('[data-testid="creature-header"] h1').should("have.text", "Ament Fordye");
      });

      it("should have the character subtitle", () => {
        cy.get('[data-testid="creature-header"] h6').should("have.text", "Humano, Montaraz nivel 1 ");
      });

      it("should have the menu buttons", () => {
        cy.get('[data-testid="creature-header"] button>[data-testid="EditIcon"]').should("exist");
        cy.get('[data-testid="creature-header"] button>[data-testid="DeleteIcon"]').should("exist");
        cy.get('[data-testid="creature-header"] button>[data-testid="FileDownloadIcon"]').should("exist");
        cy.get('[data-testid="creature-header"] button>[data-testid="CodeIcon"]').should("exist");
      });
    });

    describe("Character flavor", () => {
      it("should exist", () => {
        cy.get("#creature-flavor").should("exist");
      });

      it("should have the character portrait", () => {
        cy.get("#creature-flavor img").should("exist");
      });

      it("should have the personality description", () => {
        cy.get("#creature-flavor #section-personalidad>h1").should("have.text", "Personalidad");
        cy.get("#creature-flavor #section-personalidad>p").should("exist");
      });

      it("should have the appearence description", () => {
        cy.get("#creature-flavor #section-apariencia>h1").should("have.text", "Apariencia");
        cy.get("#creature-flavor #section-apariencia>p").should("exist");
      });

      it("should have the backstory description", () => {
        cy.get("#creature-flavor #section-historia>h1").should("have.text", "Historia");
        cy.get("#creature-flavor #section-historia>p").should("exist");
      });
    });

    describe("Character stats", () => {
      it("should exist", () => {
        cy.get('[data-testid="creature-header"]').should("exist");
      });

      describe("Stats", () => {
        it("should have all the stats", () => {
          cy.get('[data-testid="stats-container"] > div').should("have.length", 6);
        });

        it("should display all stats titles correctly", () => {
          cy.get('[data-testid="strength-stat"] [data-testid="strength-title"]').should("have.text", "FUE");
          cy.get('[data-testid="dexterity-stat"] [data-testid="dexterity-title"]').should("have.text", "DES");
          cy.get('[data-testid="constitution-stat"] [data-testid="constitution-title"]').should("have.text", "CON");
          cy.get('[data-testid="intelligence-stat"] [data-testid="intelligence-title"]').should("have.text", "INT");
          cy.get('[data-testid="wisdom-stat"] [data-testid="wisdom-title"]').should("have.text", "SAB");
          cy.get('[data-testid="charisma-stat"] [data-testid="charisma-title"]').should("have.text", "CAR");
        });

        it("should display all stat modifiers correctly", () => {
          cy.get('[data-testid="strength-stat"] [data-testid="strength-modifier"]').should("have.text", "0");
          cy.get('[data-testid="dexterity-stat"] [data-testid="dexterity-modifier"]').should("have.text", "+3");
          cy.get('[data-testid="constitution-stat"] [data-testid="constitution-modifier"]').should("have.text", "+2");
          cy.get('[data-testid="intelligence-stat"] [data-testid="intelligence-modifier"]').should("have.text", "+1");
          cy.get('[data-testid="wisdom-stat"] [data-testid="wisdom-modifier"]').should("have.text", "+2");
          cy.get('[data-testid="charisma-stat"] [data-testid="charisma-modifier"]').should("have.text", "-1");
        });

        it("should display all stat scores correctly", () => {
          cy.get('[data-testid="strength-stat"] [data-testid="strength-score"]').should("have.text", "10");
          cy.get('[data-testid="dexterity-stat"] [data-testid="dexterity-score"]').should("have.text", "16");
          cy.get('[data-testid="constitution-stat"] [data-testid="constitution-score"]').should("have.text", "14");
          cy.get('[data-testid="intelligence-stat"] [data-testid="intelligence-score"]').should("have.text", "12");
          cy.get('[data-testid="wisdom-stat"] [data-testid="wisdom-score"]').should("have.text", "14");
          cy.get('[data-testid="charisma-stat"] [data-testid="charisma-score"]').should("have.text", "8");
        });
      });

      describe("Proficiences", () => {
        it("should have all the proficiencies", () => {
          cy.get('[data-testid="stats-proficiencies"] ul > li').should("have.length", 7);
        });

        it("should have two elements in each child", () => {
          cy.get('[data-testid="stats-proficiencies"] ul > li:first p').should("have.length", 2);
        });
      });

      describe("Abilities", () => {
        describe("Tabs", () => {
          it("should have all the available tabs", () => {
            cy.get('[role="tablist"]>button').should("have.length", 4);
          });

          it("should navigate between tabs", () => {
            cy.get("#tab-1").click().should("have.attr", "aria-selected", "true");
            cy.get("#tab-2").click().should("have.attr", "aria-selected", "true");
            cy.get("#tab-3").click().should("have.attr", "aria-selected", "true");
            cy.get("#tab-0").click().should("have.attr", "aria-selected", "true");
          });
        });

        it("should render the correct container", () => {
          cy.get('[data-testid="abilities-container-0"]').should("exist");
          cy.get('[data-testid="abilities-container-1"]').should("exist");
          cy.get('[data-testid="abilities-container-2"]').should("exist");
          cy.get('[data-testid="abilities-container-3"]').should("exist");
        });

        it("should have the correct abilities in each first tab", () => {
          cy.get("#tab-0").click();

          cy.get('[data-testid="abilities-container-0"] > tr:eq(0)>td:first>span').should("have.text", "Espada larga");
          cy.get('[data-testid="abilities-container-0"] > tr:eq(2)>td:first>span').should("have.text", "Daga");
          cy.get('[data-testid="abilities-container-0"] > tr:eq(4)>td:first>span').should("have.text", "Arco largo");

          cy.get("#tab-1").click();

          cy.get('[data-testid="abilities-container-1"] > tr:eq(0)>td:first>span').should(
            "have.text",
            "Enemigo favorecido"
          );
          cy.get('[data-testid="abilities-container-1"] > tr:eq(2)>td:first>span').should(
            "have.text",
            "Explorador habilidoso"
          );
          cy.get('[data-testid="abilities-container-1"] > tr:eq(4)>td:first>span').should(
            "have.text",
            "Dote — Experto"
          );

          cy.get("#tab-2").click();

          cy.get('[data-testid="abilities-container-2"] > tr:eq(0)>td:first>span').should(
            "have.text",
            "Ropas, comunes"
          );
          cy.get('[data-testid="abilities-container-2"] > tr:eq(2)>td:first>span').should(
            "have.text",
            "Raciones (1 día)"
          );
          cy.get('[data-testid="abilities-container-2"] > tr:eq(4)>td:first>span').should("have.text", "Daga");
          cy.get('[data-testid="abilities-container-2"] > tr:eq(6)>td:first>span').should("have.text", "Cuero");
          cy.get('[data-testid="abilities-container-2"] > tr:eq(8)>td:first>span').should("have.text", "Espada larga");
          cy.get('[data-testid="abilities-container-2"] > tr:eq(10)>td:first>span').should("have.text", "Arco largo");
          cy.get('[data-testid="abilities-container-2"] > tr:eq(12)>td:first>span').should(
            "have.text",
            "Equipo de cazador de monstruos"
          );
          cy.get('[data-testid="abilities-container-2"] > tr:eq(14)>td:first>span').should(
            "have.text",
            "Caballo de monta"
          );

          cy.get("#tab-3").click();
          cy.get('[data-testid="abilities-container-3"] > tr:eq(0)>td:first>span').should(
            "have.text",
            "Cazarrecompensas"
          );
        });

        it("should open the collapsed description", () => {
          cy.get("#tab-0").click();
          cy.get('[data-testid="abilities-container-0"] > tr:eq(0)>td:eq(1)>button').click();
          cy.get('[data-testid="abilities-container-0"] > tr:eq(1)>td')
            .should("have.attr", "colspan", "3")
            .and("not.be.empty");

          cy.get("#tab-0").click();
          cy.get('[data-testid="abilities-container-0"] > tr:eq(0)>td:eq(1)>button').click();
          cy.get('[data-testid="abilities-container-0"] > tr:eq(1)>td')
            .should("have.attr", "colspan", "3")
            .and("be.empty");
        });
      });
    });
  });
});

describe("NPC", () => {
  describe("NPC list", () => {
    before(() => {
      cy.login();
      cy.visit("/characters?step=1");
      cy.wait("@session");
    });

    it("should render the page", () => {
      cy.get("main h1").should("have.text", "Personajes");
    });

    it("should have character and npc tabs", () => {
      cy.get("button#simple-tab-0").should("have.text", "Personajes").click().url().should("include", "step=0");
      cy.get("button#simple-tab-1").should("have.text", "NPCs").click().url().should("include", "step=1");
    });

    it("should have the menu buttons", () => {
      cy.get('button>svg[data-testid="GridViewIcon"]').should("exist");
      cy.get('button>svg[data-testid="UploadFileIcon"]').should("not.exist");
      cy.get('button>svg[data-testid="AddIcon"]').should("exist");
    });

    it("should be able to search", () => {
      cy.get("input[type=text]").type("Bruja");
      cy.get("h6.MuiTypography-subtitle1").should("have.text", "Bruja");
    });

    it("should include the table buttons", () => {
      cy.get('button>[data-testid="EditIcon"').should("have.length", 1);
      cy.get('button>[data-testid="DeleteIcon"').should("have.length", 1);
    });
  });
});
