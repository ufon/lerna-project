# Lerna Front-End

## Description

Streaming platform for education

## Installing

```bash
$ npm i
$ npm start
```

## Git workflow

Gitflow (master, develop, hotfix, etc.)

### Brunch naming

`<type>/<name>`

| Type    | Description                           |
| ------- | ------------------------------------- |
| bug     | Code changes linked to a known issue. |
| feature | New feature.                          |
| hotfix  | Quick fixes to the codebase.          |

_Name_
Always use dashes to seperate words, and keep it short.

_Examples_

- feature/renderer-cookies
- hotfix/dockerfile-base-image
- bug/login-ie

### Commit naming

`<type>: <commit>`

| Type     | Description                 |
| -------- | --------------------------- |
| delete   | Deleted something           |
| fix      | Fixed some bugs             |
| hotfix   | Fixed some bugs             |
| add      | New functional              |
| change   | Changed something           |
| refactor | Rewrited, updated something |

_Examples_

- add: renderer-cookies
- hotfix: dockerfile-base-image
- fix: login-ie

## Built With

- [React Boilerplate](https://www.reactboilerplate.com/) - by Max Stoiber.
