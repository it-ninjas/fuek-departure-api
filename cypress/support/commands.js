Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/api/login', {
    email: email,
    password: password,
  }).then((resp) => {
    window.localStorage.setItem('jwt', resp.body.token);
  });
});
