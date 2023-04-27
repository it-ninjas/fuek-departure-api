import '../support/commands';

beforeEach(() => {
  cy.login('alice@example.com', 'pw42')
})

it('GET index lists all saved connections', () => {
  cy.request({
    method: 'GET',
    url: '/api/connections',
    headers: {
      'Content-Type': 'application/json',
    },
  }).should((response) => {
    expect(response.status).to.eq(200);

    const connections = response.body;
    const connection = connections[0];
    expect(connection.from).to.eq('Bern');
    expect(connection.to).to.eq('Brig');
  });
});

it('POST create creates new connection entry', () => {
  cy.request({
    method: 'POST',
    url: '/api/connections',
    headers: {
      'Content-Type': 'application/json',
    },
    body: '{"from":"Zürich","to":"Chur"}',
  }).should((response) => {
    expect(response.status).to.eq(200);

    const connection = response.body;
    expect(connection.from).to.eq('Zürich');
    expect(connection.to).to.eq('Chur');
  });
});

it('GET index returns authorization required without valid access token', () => {
  cy.request({
    method: 'GET',
    url: '/api/connections',
    headers: {
      'Content-Type': 'application/json',
    },
  }).should((response) => {
    expect(response.status).to.eq(200);

    const connections = response.body;
    const connection = connections[0];
    expect(connection.from).to.eq('Bern');
    expect(connection.to).to.eq('Brig');
  });
});

