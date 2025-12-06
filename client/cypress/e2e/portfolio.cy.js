describe("Portfolio E2E", () => {
  it("loads home page and shows sections", () => {
    cy.visit("http://localhost:5173");


    cy.contains(/Hello, I'm Bri!/i).should("exist");
    cy.contains(/EDUCATION/i).should("exist");
    cy.contains(/PROJECTS/i).should("exist");
    cy.contains(/Contact/i).should("exist");
  });

  it("signs in as admin and shows success alert", () => {
    cy.visit("http://localhost:5173");

    cy.get("input[placeholder='Email']").type("dionisiobrianna@icloud.com");
    cy.get("input[placeholder='Password']").type("admin123");

    cy.contains("Sign In").click();

    cy.on("window:alert", (text) => {
      expect(text).to.match(/Signed in successfully/i);
    });

    cy.contains(/Hello, I'm Bri!/i).should("exist");
  });
});
