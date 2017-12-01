const RepoTest = require('../database').RepoTest;
const { requireFields } = require('../common/validation');
const { sendUserError } = require('../common/errors');
const { objectFromExistingFields } = require('../common/utils');

module.exports = {
  createRepoTest: async (req, res) => {
    try {
      const { requestId, repoUrl, status } = req.body;
      requireFields({ requestId, repoUrl });
      const newRepoTest = await new RepoTest(
        objectFromExistingFields({ requestId, repoUrl, status })
      ).save();
      res.json(newRepoTest);
    } catch (error) {
      sendUserError(error, res);
    }
  },
  getRepoTestStatus: async (req, res) => {
    try {
      const { requestId } = req.params;
      requireFields({ requestId });
      const repoTest = await RepoTest.findOne({ requestId });
      if (repoTest) return res.json(repoTest.status);
      sendUserError();
    } catch (error) {
      sendUserError(error, res);
    }
  }
};
