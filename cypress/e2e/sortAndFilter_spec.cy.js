
describe("Should sort func wrok", () => {
  it("Passes ", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="test-sort-radio"]').each((item, index,list) => {
      item.click();
      cy.log(index + " clicked");
    });
  });
});

describe("Should filter brand func wrok", () => {
  it("Passes ", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="test-brand-filter-checkbox"]').each(async(item, index,list) => {
      console.log("fired "+index
      );
        item.click({ timeout: 10000 })
    });
  });
});
