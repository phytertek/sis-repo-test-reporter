module.exports = {
  // App Components
  Components: {
    Auth: {
      Schema: 'authentication user schema',
      Services: 'authenticatedRoute and decodeToken',
      Routes: {
        '/auth': [
          'POST /register - new user registration',
          'POST /update - username and password update',
          'POST /login - user login',
          'GET /logout - user logout'
        ],
        '/admin': [
          'POST /makeSystemAdmin - create first System Admin',
          'POST /add-admin-route - add user as a Route Admin'
        ]
      }
    },
    User: {
      Schema: 'base user schema',
      Routes: {
        '/user': [
          "GET /all - returns all user's",
          'GET /one - returns a user by query params',
          'GET /current - returns currently logged in user'
        ]
      }
    }
  },
  // App Configuration
  Config: {
    Level: process.env.NODE_ENV || 'development',
    Name: process.env.NAME || 'repo-test-reporter',
    Host: process.env.HOST || 'http://localhost',
    Port: process.env.PORT || 3434,
    DatabaseName: process.env.DBNAME || 'repo-test-reporter Dev DB',
    DatabaseURI: process.env.DB_URI || 'mongodb://localhost/apier-dev',
    JWTSecret: process.env.JWT_SECRET || 'OzAdp;s0(6g:3Iou%LU^p}TE@bnzP^a1',
    BcryptCost: process.env.BCRYPT_COST || 11
  }
};
