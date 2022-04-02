// note: should also import this module to index.js
// https://docs.strapi.io/developer-docs/latest/plugins/graphql.html#customization
module.exports = {
  extension: () => ({
    // note: you can also use nexus to define types which the docs refers to
    // GraphQL SDL
    typeDefs: `
		type refreshToken {
			jwt: String,
			user: UsersPermissionsMe
		}
		type Query {
			refreshToken: refreshToken
		}
		`,

    resolvers: {
      Query: {
        refreshToken(parent, args, ctx, info) {
          const newJwt = strapi.plugins['users-permissions'].services.jwt.issue({
            id: ctx.state.user.id
          })

          return { jwt: newJwt, user: ctx.state.user }
        },
      },
    },

    // if need resolver config
    // resolversConfig: {
    //   'Query.refreshToken': {
    // 	auth: false,
    //   },
    // },
  })
}
