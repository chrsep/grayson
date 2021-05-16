describe("test authentication", function () {
  it("should be able ton login", function () {
    cy.visit("/")
    cy.contains("Masuk").click()
    cy.contains("E-mail").click().type("hi@chrsep.dev")
    cy.contains("Password").type("test")
    cy.contains("Masuk").click()
    cy.contains("Masuk").should("not.exist")
  })
})
