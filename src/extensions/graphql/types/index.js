'use strict';

const typesFactories = [
  require('./user'),
  require('./subTest')
]

module.exports =  (context) => typesFactories.map((factory) => {
  return factory(context)
});
