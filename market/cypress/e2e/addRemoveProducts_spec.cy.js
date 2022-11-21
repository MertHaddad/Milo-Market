describe("Add/remove products", () => {
  it("passes", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
    cy.log("add all products")
    cy.get(".product-button").each((item) => item.click());
    cy.log("remove 1st and 2nd")
    cy.get("[name='decrease']").each((item, index) => {
      if (index<2) {
        item.click();
      }
    });
    cy.log("increase 3rd adn 4rth")
    cy.get("[name='increase']").each((item, index) => {
      if (index===2 || index===3 ) {
        item.click();
        item.click();
        item.click();
      }
    });
    cy.get(".basket-item").should("have.length",14)
    cy.scrollTo("top");
  });
});

describe("Add all products", () => {
  it("passes", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
    let i=0
    while (i<108){
    cy.get(".product-button").each((item) => item.click());
    cy.contains("Next").click();
    i++
  }
  });
});
