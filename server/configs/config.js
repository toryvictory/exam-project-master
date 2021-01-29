const config = {
  url: process.env.url || 'http://localhost:3000',
  port: process.env.PORT || 5000,
  jwt: {
    tokenExpiresIn: process.env.ACCESS_TOKEN_EXP || '30m',
    tokenSecret: process.env.ACCESS_TOKEN_SECRET || 'access token secret value',
    passResetTokenExpiresIn: process.env.PASS_TOKEN_EXP || '1d',
    passResetTokenSecret: process.env.PASS_TOKEN_SECRET || 'password reset token secret',
  },
  permissions: {
    roles: ['customer', 'creator', 'moderator'],
  },
  email: {
    userEmail: 'servicesquadhelp@gmail.com',
    passwordEmail: 'squadhelp1SQUADHELP',
  },
};

module.exports = config;
