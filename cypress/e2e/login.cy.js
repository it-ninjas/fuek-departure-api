it("POST login returns 'Email and password required' if no params", () => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
    },
  }).should((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.eq('Email and password required');
  });
});

it('POST login does not return token if unknown email', () => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
    },
    body: '{"email":"unkown@example.com","password":"my-sweet-pw42"}',
  }).should((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.eq('Invalid Credentials');
  });
});

it('POST login does not return token if invalid password', () => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
    },
    body: '{"email": "alice@example.com","password":"my-sweet-pw42"}',
  }).should((response) => {
    expect(response.status).to.eq(400);
    expect(response.body).to.eq('Invalid Credentials');
  });
});

it('POST login return a valid token with valid email, password', () => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
    },
    body: '{"email":"alice@example.com","password":"pw42"}',
  }).should((response) => {
    expect(response.status).to.eq(200);
    //expect(response.body).to.eq('Invalid Credentials');
  });
});
