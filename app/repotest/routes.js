const { createRepoTest, getRepoTestStatus } = require('./controllers');

module.exports = {
  '/repotest': {
    post: {
      '/new': createRepoTest
    },
    get: {
      '/status/:requestId': getRepoTestStatus
    }
  }
};
