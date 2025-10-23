# Login Page - Test Plan (Cypress)

## 🎯 Objective
Ensure that the login page authentication flow works correctly, including:
- Login with valid credentials
- Field validations
- Appropriate error messages
- Correct redirections
- Enter key functionality

---

## 🧩 Test Scenarios

| ID   | Scenario                                               | Expected Outcome |
|------|--------------------------------------------------------|-----------------|
| T01  | Login with valid credentials                           | Redirects to the home page |
| T02  | Login with incorrect password                          | Displays "Invalid credentials" |
| T03  | Empty fields                                           | Displays "Please fill in all fields" |
| T04  | Invalid email format                                   | Displays "Invalid email format" |
| T05  | Non-existent user                                      | Displays "User not found" |
| T06  | Server error 500                                       | Displays "Internal server error, please try again" |
| T07  | Pressing Enter                                         | Submits the form and logs in successfully |
| T08  | Already authenticated user accessing /login           | Automatically redirects to the home page |

---

