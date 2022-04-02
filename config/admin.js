module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'cd11d7ca8cabedaa5101698e7368cf4e'),
  },
});
