'use strict';

const { pagination } = require('@strapi/utils/lib');

/**
 *  house controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::house.house', ({ strapi }) => ({
  async update(ctx) {
    const response = await super.update(ctx);

    // generate title
    const { bed, bath, rent } = response.data.attributes
    const generateTitle = `${bed} bed / ${bath} bath / ${rent} a month`

    // update title to database
    // method 1 (use update) also you can use other api to update title
    ctx.request.body.data = { title: generateTitle }
    const finalRes = await super.update(ctx)

    return finalRes
  },

  async find(ctx) {

    const { data: projects, meta } = await super.find({})
    console.log(projects, meta)

    return projects
  }
}));
