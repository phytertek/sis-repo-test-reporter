module.exports = {
  // App Components
  Components: {
    RepoTest: {
      Routes: true,
      Schema: true
      // Services: true
    }
  },
  // App Configuration
  Config: {
    Level: process.env.NODE_ENV || 'development',
    Name: process.env.NAME || 'repo-test-reporter',
    Host: process.env.HOST || 'http://localhost',
    Port: process.env.PORT || 3434,
    DatabaseName: process.env.DBNAME || 'repo-test-reporter Dev DB',
    DatabaseURI:
      process.env.DB_URI ||
      'mongodb://student:student@ds147544.mlab.com:47544/lambda-projects'
  }
};
