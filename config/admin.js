module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'e5dd1f61e024d2421e724fd150456de3'),
  },
});
