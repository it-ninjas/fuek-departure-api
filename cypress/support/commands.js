Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/api/login', {
    email: email,
    password: password,
  }).then((resp) => {
    window.localStorage.setItem('jwt', resp.body.token);
  });
});

// Overwrite cy.request() to set default options
Cypress.Commands.overwrite('request', (originalFn, ...args) => {
  const defaults = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': window.localStorage.getItem('jwt'),
    },
  };

  let options = {};
  if (typeof args[0] === 'object' && args[0] !== null) {
    options = args[0];
  } else if (args.length === 1) {
    [options.url] = args;
  } else if (args.length === 2) {
    [options.method, options.url] = args;
  } else if (args.length === 3) {
    [options.method, options.url, options.body] = args;
  }

  return originalFn({
    ...defaults,
    ...options,
    ...{ headers: { ...defaults.headers, ...options.headers } },
  });
});
