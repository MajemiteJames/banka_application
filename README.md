# banka_application

[![Build Status](https://travis-ci.org/MajemiteJames/banka_application.svg?branch=ft-development-branch)](https://travis-ci.org/MajemiteJames/banka_application)
[![Coverage Status](https://coveralls.io/repos/github/MajemiteJames/banka_application/badge.svg?branch=ft-development-branch)](https://coveralls.io/github/MajemiteJames/banka_application?branch=ft-development-branch)
[![Maintainability](https://api.codeclimate.com/v1/badges/d4ee380ef571a0b93da5/maintainability)](https://codeclimate.com/github/MajemiteJames/banka_application/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d4ee380ef571a0b93da5/test_coverage)](https://codeclimate.com/github/MajemiteJames/banka_application/test_coverage)

# What Banka App is about
Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals. This app is meant to support a single bank, where
users can signup and create bank accounts online, but must visit the branch to withdraw or
deposit money..


# Required Features
1. User (client) can sign up.
2. User (client) can login.
3. User (client) can create an account.
4. User (client) can view account transaction history.
5. User (client) can view a specific account transaction.
6. Staff (cashier) can debit user (client) account.
7. Staff (cashier) can credit user (client) account.
8. Admin/staff can view all user accounts.
9. Admin/staff can view a specific user account.
10. Admin/staff can activate or deactivate an account.
11. Admin/staff can delete a specific user account.
12. Admin can create staff and admin user accounts.

# Installtions
1 Clone this repository to your local machine 
 https://github.com/MajemiteJames/banka_application.git
  
 # Install dependencies
 
  npm install

  Run npm run dev-start to start the application.
  
  # API ENDPOINTS
  HTTP VERB	ENDPOINT	FUNCTIONALITY
  
  POST /auth/signup  Create user account
  
  POST /auth/signin   Login a user
  
  POST /accounts Create a bank account
  
  PATCH /account/<account-number>    Activate or deactivate an account. Specify the new status in the request body.
  
  DELETE /accounts/<account-number>   Delete a specific bank account.
  
  POST /transactions/<account-number>/debit   Debit a bank account.
  
  POST /transactions/<account-number>/credit    Credit a bank account
  
  # Testing
  Install Postman to test the endpoints manually.
  
  Run npm test to test all the endpoints.
  
  npm install -g mocha
