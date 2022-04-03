'use strict';

/**
 *  course-serial controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::course-serial.course-serial',
  ({ strapi }) => ({
    async findOne(ctx) {
      // it will be better to set default
      const { _start = 0, _limit = 3 } = ctx.request.query

      const response = super.findOne(ctx).then(
        res => res.data.attributes.courses.data.slice(_start, _limit)
      )

      return response
    }
  })
);
