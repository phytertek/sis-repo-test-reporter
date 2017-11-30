const spawn = require('child-process').spawn;
const RepoTest = require('../database').RepoTest;
const { throwError } = require('../common/errors');

const testQueue = [];
let currentTest;

const runTest = async (test) => {
//clone the repo
//install
//run test suite
//delete cloned repo  
//return results  
}

const clearQueue = async () => {
  while (testQueue.length) {
    currentTest = testQueue.shift();
    currentTest.status = 'Running';
    await currentTest.save();
    const testRun = await runTest(currentTest);
    if (['Finished', 'Error'].find(status => status === testRun.status)) {
      currentTest.status = testRun.status
      currentTest.finishMessage = testRun.message
      await currentTest.save()
    }
  }
};

const getQueue = async () => {
  try {
    const queue = await RepoTest.find({ status: 'Queued' });
  } catch (error) {
    throwError(error);
  }
};

module.exports = {
  testQueue,
  currentTest
};

// Queue Runner Startup
(function async() {
  try {
    setInterval(() => {
      if (!testQueue.length) await getQueue();
      await clearQueue();
      return;
    }, 1000)
  } catch (error) {
    throwError(error);
  }
})();
