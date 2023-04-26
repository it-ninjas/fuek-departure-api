#!/bin/bash

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"alice@example.com","password":"pw42"}' \
  http://localhost:4242/api/login
