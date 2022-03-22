# strapi-study-cases
Note some cases when use strapi
## add a refresh token api
reference: [strapi docs](https://docs.strapi.io/developer-docs/latest/development/plugins-extension.html#extending-a-plugin-s-interface)    
when token expired, you can issue a new token. and when you want customize other plugin's interface, it should be the same logic.     
case code: [/src/extensions/users-permissions/strapi-server.js](src/extensions/users-permissions/strapi-server.js)

## add customizing graphql query as refreshToken
reference: [strapi docs](https://docs.strapi.io/developer-docs/latest/plugins/graphql.html#customization)    
should be modify the entry file: [./src/index.js](src/index.js)    
if customizing more types or apis, taking these code to a new module may be better.    
case code: [./src/extensions/graphql](src/extensions/graphql/customizeExt.js)