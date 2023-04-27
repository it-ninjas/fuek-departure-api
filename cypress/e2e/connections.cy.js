import '../support/commands';

beforeEach(() => {
  cy.login('alice@example.com', 'pw42');
});

it('GET index lists all saved connections', () => {
  cy.request({
    method: 'GET',
    url: '/api/connections',
  }).should((response) => {
    expect(response.status).to.eq(200);

    const connections = response.body;
    expect(connections.length).to.eq(1);
    const connection = connections[0];
    expect(connection.from).to.eq('Bern');
    expect(connection.to).to.eq('Brig');
  });
});

it('POST create creates new connection entry', () => {
  cy.request({
    method: 'POST',
    url: '/api/connections',
    body: '{"from":"Zürich","to":"Chur"}',
  }).should((response) => {
    expect(response.status).to.eq(200);

    const connection = response.body;
    expect(connection.from).to.eq('Zürich');
    expect(connection.to).to.eq('Chur');
  });

  cy.request({
    method: 'GET',
    url: '/api/connections',
  }).should((response) => {
    expect(response.status).to.eq(200);

    const connections = response.body;
    expect(connections.length).to.eq(2);
    const connection = connections[1];
    expect(connection.from).to.eq('Zürich');
    expect(connection.to).to.eq('Chur');
  });
});

it('DELETE delete destroys existing entry', () => {
  cy.request({
    method: 'DELETE',
    url: '/api/connections/1',
  }).should((response) => {
    expect(response.status).to.eq(200);
  });

  cy.request({
    method: 'GET',
    url: '/api/connections',
  }).should((response) => {
    expect(response.status).to.eq(200);

    const connections = response.body;
    expect(connections.length).to.eq(1);
  });
});

it('GET index return access denied with invalid token', () => {
  cy.request({
    method: 'GET',
    url: '/api/connections',
    failOnStatusCode: false,
    headers: {
      'x-access-token': 'nid-gültig-so',
    }
  }).should((response) => {
    expect(response.status).to.eq(401);
  });
});
