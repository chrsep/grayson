import { internet } from "faker"

describe("test register", function () {
  it("should be able to register", function () {
    cy.visit("/")
    cy.contains("Masuk").click()
    cy.contains("Daftar").click()
    cy.contains("Nama Lengkap").click().type("Jeremy Slovich")
    cy.contains("E-mail").click().type(internet.email())
    cy.contains("Password").type("rebuttal")
    cy.contains("Daftar").click()
    cy.contains("Masuk").should("not.exist")
  })
})
