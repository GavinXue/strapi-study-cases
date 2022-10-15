# Strapi Offcial GraphQL plugin Modify

Due to strapi v4 graphql result nesting `data/atrributes` is so boring. I want to find if there is a way to modify the plugin to solve it temporary.

## Test the modified Result

you can clone the repo and test result structrue:

```sh
git clone https://github.com/GavinXue/strapi-study-cases.git
yarn   # or npm install
yarn develop   # or npm run develop
```

Due to I have update the sqllite db to github. When run these cases the test strapi, you can directly login with:

`name:` strapi@test.com  
`password:`: Strapi2022

`apiToken:` the description of test token is the actual token (use it directly.) or you can creat a new one.

## Add the plugin to your repo

If you want use this plugin, please read [strapi plugins development doc](https://docs.strapi.io/developer-docs/latest/development/plugins-development.html#create-a-plugin) first, then you can follow next step:

1. Copy `src/plugins/graphql` folder to your repo
2. Add graphql config to `config/plugins.js`
3. rerun `yarn build` & `yarn develop`

any question please read the docs first.

## Diff from official graphql plugin

- you can find all changes in the plugin by seaching `fd changes` in all docs (It's a label to show where has modified)
- change in type.js: add id to ModelType
- change in entity.js: to make EntityType equal to ModelType (to remove attributes wrapper)
- change in collection-type.js: replace findOne response type to EntityType
- change in association.js: replace toEntityResponse(data, info) to data directly. (When use findOne, no EntityResponseType used again)

The logic to flatten the reslut:

1. remove attributes in EntityType, then EntityType will be the same with ModelType
2. remove data wrapper in single response, then single response type will be EntityType

## Notice

Things you should note:

- It is not stable, please do not use in production unless you test all problem by yourself
- EntityResponseType will not use in regular collection query. it it already replaced by EntityType
- can't assure the plugin work correctly. (only test in regular collection, and regular relation)
- data wrapper still be there if the response is collectionType.

To learn more about GraphQL in Strapi [visit documentation](https://docs.strapi.io/developer-docs/latest/plugins/graphql.html)
