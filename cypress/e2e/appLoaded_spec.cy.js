//navBar loaded & logo shows & basket item loaded
describe("navbar fully loaded with content", () => {
  it("passes on Computer", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
    cy.get(".navbar").should("be.visible");
    cy.get(".navbar-logo > img").should("be.visible");
    cy.get("#cart-button > img").should("be.visible");
  });
  it("passes on Mobile", () => {
    cy.viewport(390, 844);
    cy.visit("http://localhost:3000");
    cy.get(".navbar").should("be.visible");
    cy.get(".navbar-logo > img").should("be.visible");
    cy.get("#cart-button > img").should("be.visible");
  });
});

//sorting & filtering loaded
describe("sorting & filtering loaded", () => {
  it("passes on Computer", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
    cy.get(".filters")
      .children()
      .should("contain", "Sorting")
      .and("contain", "Brands")
      .and("contain", "Tags");

    cy.get(".filter-container").should(($lis) => {
      expect($lis).to.have.length(3);
    });
  });

  it("passes on Mobile", () => {
    cy.viewport(390, 844);
    cy.visit("http://localhost:3000");
    cy.get(".filters")
      .children()
      .should("contain", "Sorting")
      .and("contain", "Brands")
      .and("contain", "Tags");

    cy.get(".filter-container").should(($lis) => {
      expect($lis).to.have.length(3);
    });
  });
});

//empty basket loaded with image
describe("empty basket loaded with image",()=>{
  it("passes on Computer", ()=>{
    cy.viewport(1920,1080)
    cy.visit('http://localhost:3000')
    cy.get(".basket > .empty-cart").should("be.visible")
  })

  it("passes on Mobile", ()=>{
    cy.viewport(390,844)
    cy.visit('http://localhost:3000')
    cy.visit('http://localhost:3000')
    cy.get(".basket > .empty-cart").should("be.visible")
  })
  }
  )

  //products loaded
describe("products loaded",()=>{
  it("passes on Computer", ()=>{
    cy.viewport(1920,1080)
    cy.visit('http://localhost:3000')
    cy.get('.products').should("be.visible")
    cy.get('.pagination-container').should("be.visible")
    cy.get('[data-testid="filter-by-type-shirt"]').should("be.visible")
    cy.get('[data-testid="filter-by-type-mug"]').should("be.visible")
  })

  it("passes on Mobile", ()=>{
    cy.viewport(390,844)
    cy.visit('http://localhost:3000')
    cy.get('.products').should("be.visible")
    cy.get('.pagination-container').should("be.visible")
    cy.get('[data-testid="filter-by-type-shirt"]').should("be.visible")
    cy.get('[data-testid="filter-by-type-mug"]').should("be.visible")
    cy.get('.footer').should("be.visible")

  })  }
  )