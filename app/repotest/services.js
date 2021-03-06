const spawnSync = require('child_process').spawnSync;
const RepoTest = require('../database').RepoTest;
const { throwError } = require('../common/errors');
const logger = require('../common/logger');
const cwd = process.cwd();
let testQueue = [];
let currentTest;

const runTest = (test, done) => {
  spawnSync(
    [
      `git clone ${test.repoUrl}.git ${test._id}`,
      `cd ${test._id}`,
      'yarn install',
      `yarn test:sis`
    ].join(' && '),
    {
      shell: true
    }
  );
  console.log(cwd);
  const testResults = require(`${cwd}/${test._id}/testRun`);
  spawnSync(`rm -rf ${cwd}/${test._id}`, {
    shell: true
  });

  test.status = 'Finished';
  test.finishMessage = testResults;
  return test;
};

const clearQueue = async () => {
  clearInterval();
  if (!testQueue.length) {
    logger.info('Test queue clear');
  }
  while (testQueue.length) {
    logger.info('Test Found!');
    currentTest = testQueue.shift();
    logger.info(`Running test ${currentTest._id}...`);
    currentTest.status = 'Running';
    await currentTest.save();
    currentTest = runTest(currentTest);
    await currentTest.save();
  }
};

const getQueue = async () => {
  try {
    testQueue = await RepoTest.find({ status: 'Queued' });
  } catch (error) {
    throwError(error);
  }
};

const runner = async () => {
  logger.info('Next test poll starting');
  if (!testQueue.length) await getQueue();
  await clearQueue();
};
module.exports = {
  testQueue,
  currentTest
};

// Queue Runner Startup
(function async() {
  try {
    setInterval(async () => runner(), 10000);
  } catch (error) {
    throwError(error);
  }
})();
