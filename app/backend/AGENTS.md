# Backend Guidelines

## Code Changes

* Modify only what was requested. Avoid unrelated changes.
* Follow the existing patterns and structure of the backend.

## Commits

* Use one of these types at the beginning of the commit message: `feat`, `refactor`, `docs`, or `test`.
* Write all commit messages in English.
* Follow this format: `<type>(<scope>): <description>`.
* The scope must identify the affected module or functional area, **not the name of an individual file**.
* Use a short, descriptive scope, such as `auth`, `users`, `coupons`, or `orders`.
* Write the description using the imperative form.
* Examples:

  * `feat(auth): add session validation endpoint`
  * `refactor(coupons): simplify repository logic`
  * `docs(users): document authentication flow`
  * `test(auth): cover session validation`

## Tests

* Running tests after every individual change is not required.

