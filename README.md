Backend für das Frontend-ÜK Projekt

# Setup

```
npm install
npm run setup
```

# Usage

Setup creates a user with email: 'alice@example.com' and password 'pw42'

```
npm start
```

http://localhost:4242

## Endpoints

### Login

POST http://localhost:4242/api/login

Valid request body:
```
{ "email": "alice@example.com", "password": "pw42" }
```

Example response:
```
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwiaWF0IjoxNjgyNTE5Nzg5LCJleHAiOjE2ODI1MjY5ODl9.iDPEjZnsSQdPsNfGL8-ou3Jm8U__GQZPSAK_7ngUVLw",
  "firstName": "Alice",
  "lastName": "Ninja",
  "email": "alice@example.com" }
```

Returns HTTP Status `200` if login successful, else `400`

### Connections

http://localhost:4242/api/connections

# Testing

run tests

```
npm test
```
