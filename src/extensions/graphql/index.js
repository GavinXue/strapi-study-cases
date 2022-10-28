'use strict';

const getTypes = require('./types');
const getResolverConfig = require('./resolverConfig')

module.exports = (ctx) => {
  return {
    types: [getTypes(ctx)],
    resolversConfig: getResolverConfig()
  }
}
