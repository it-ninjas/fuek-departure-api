it("POST login with correct credentials returns valid JWT token", () => {
  cy.request("POST", "/login").should((response) => {
    expect(response.status).to.eq(200);
  });
});
