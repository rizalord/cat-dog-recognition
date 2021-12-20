/// <reference types="cypress" />

describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("should navigate to the predict page", () => {
    cy.get("#predict-button").click()
    cy.url().should("include", "/predict")
  })

  it("should navigate to the home page after going to predict page", () => {
    cy.get("#predict-button").click()
    cy.url().should("include", "/predict")
    cy.contains("Cat Dog Recognition").click()
    cy.url().should("include", "/")
  })
})
