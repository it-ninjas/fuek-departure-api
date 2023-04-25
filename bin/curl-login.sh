#!/bin/bash

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"xyz","password":"xyz"}' \
  http://localhost:4242/api/login
