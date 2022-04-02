# strapi-study-cases

This Repo show some cases of using [Strapi - Open source Node.js Headless CMS 🚀](https://strapi.io/), I do always confused by offcial docs, as a newer to strapi I record some running example to study.

## Run the cases

Run these cases local:

```sh
git clone https://github.com/GavinXue/strapi-study-cases.git
npm install
npm run develop
```

Run thest cases online: `warn:` It seems this does not work on [stackblitz](https://stackblitz.com/), beause of some unsupported shell syntax(JSH). check some problem [Strapi on Stackblitz](https://forum.strapi.io/t/strapi-on-stackblitz/16323)

I have tried that it is worked on [replit](https://replit.com/). and the file `.replit` and `replit.nix` are the config file for replit.(import github repo to replit, then click run, and wait)

Due to I have update the sqllite db to github. When run these cases the test strapi, you can directly login with:

`name:` strapi@test.com  
`password:`: Strapi2022

`apiToken:` the description of test token is the actual token (use it directly.) or you can creat a new one.

## Introduce Some Case

### add a refresh token api

reference: [strapi docs](https://docs.strapi.io/developer-docs/latest/development/plugins-extension.html#extending-a-plugin-s-interface)  
when token expired, you can issue a new token. and when you want customize other plugin's interface, it should be the same logic.  
case code: [/src/extensions/users-permissions/strapi-server.js](src/extensions/users-permissions/strapi-server.js)

### add customizing graphql query as refreshToken

reference: [strapi docs](https://docs.strapi.io/developer-docs/latest/plugins/graphql.html#customization)  
should be modify the entry file: [./src/index.js](src/index.js)  
if customizing more types or apis, taking these code to a new module may be better.  
case code: [./src/extensions/graphql](src/extensions/graphql/customizeExt.js)

### extend core controllers

reference: [Backend customization - Controllers - Strapi Developer Docs](https://docs.strapi.io/developer-docs/latest/development/backend-customization/controllers.html#extending-core-controllers)

This comes from a question in [Auto populate title field with content from other fields - Questions and Answers - Strapi Community Forum](https://forum.strapi.io/t/auto-populate-title-field-with-content-from-other-fields/17266/3) .

solve it to extend entity update and create controller. case code: [./src/api/house/controllers/house.js](src/api/house/controllers/house.js)
