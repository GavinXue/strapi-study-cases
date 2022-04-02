# strapi-study-cases

start these cases local:

```sh
git clone https://github.com/GavinXue/strapi-study-cases.git
npm install
npm run develop
```

Note some cases when use [strapi](https://strapi.io)

Due to I have update the sqllite db to github. When run these cases the test strapi, you can directly login with:  

name: strapi@test.com  
password: Strapi2022

## add a refresh token api

reference: [strapi docs](https://docs.strapi.io/developer-docs/latest/development/plugins-extension.html#extending-a-plugin-s-interface)  
when token expired, you can issue a new token. and when you want customize other plugin's interface, it should be the same logic.  
case code: [/src/extensions/users-permissions/strapi-server.js](src/extensions/users-permissions/strapi-server.js)

## add customizing graphql query as refreshToken

reference: [strapi docs](https://docs.strapi.io/developer-docs/latest/plugins/graphql.html#customization)  
should be modify the entry file: [./src/index.js](src/index.js)  
if customizing more types or apis, taking these code to a new module may be better.  
case code: [./src/extensions/graphql](src/extensions/graphql/customizeExt.js)

## extend core controllers

reference: [Backend customization - Controllers - Strapi Developer Docs](https://docs.strapi.io/developer-docs/latest/development/backend-customization/controllers.html#extending-core-controllers)

This comes from a question in [Auto populate title field with content from other fields - Questions and Answers - Strapi Community Forum](https://forum.strapi.io/t/auto-populate-title-field-with-content-from-other-fields/17266/3) .

solve it to extend entity update and create controller. 
case code: [./src/api/house/controllers/house.js](src/api/house/controllers/house.js)
