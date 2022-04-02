'use strict';

/**
 *  article controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article',
  ({ strapi }) => ({
    async create(ctx) {

      const response = await strapi.service('api::article.article').find({
        filters: {
          user: {   // this filter linked user, you also can use createdBy
            id: ctx.state.user.id
          }
        }
      }).then(
        res => {
          if (res.results.length >= 3) {
            return "You have already created 3 article"
          }
        }
      )

      // if not great than 3, then create article, if true return the message
      const finalRes = response ?? super.create(ctx)

      return finalRes
    }
  })
);
