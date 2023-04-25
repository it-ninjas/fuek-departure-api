//it('POST login with correct credentials returns valid JWT token', () => {
//cy.request('POST', '/login').should((response) => {
//expect(response.status).to.eq(200);
//});
//});

it("POST login returns 'Email and password required' if no params", () => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    failOnStatusCode: false,
  }).should((response) => {
    expect(response.status).to.eq(400);
  });
});
