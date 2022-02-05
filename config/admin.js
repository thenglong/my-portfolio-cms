module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '585062cce05acc37f2d8746eff0fd89e'),
  },
});
