// module.exports = {
//   'Insert Model Name Here': {
//     Schema: { /* insert fields */ },
//     Hooks: (Schema) => { /* insert schema hooks */ },
//     Methods: (Schema) => { /* insert schema methods */ }
//   }
// }
module.exports = {
  RepoTest: {
    Schema: {
      requestId: { type: String, required: true, unique: true },
      repoUrl: { type: String, required: true },
      queued: { type: Date, required: true, default: Date.now() },
      status: {
        type: String,
        enum: { values: ['Queued', 'Running', 'Finished', 'Error'] },
        default: 'Queued',
        required: true
      },
      runStart: { type: Date },
      finished: { type: Date },
      finishMessage: { type: Object }
    },
    Hooks: Schema => {
      Schema.pre('save', function(next) {
        const repoTest = this;
        if (!repoTest.isModified('status')) next();
        switch (repoTest.status) {
          // case 'Queued':
          case 'Running':
            repoTest.runStart = Date.now();
            break;
          case 'Finished':
            repoTest.finished = Date.now();
            break;
          case 'Error':
            repoTest.finished = Date.now();
            break;
          default:
            break;
        }
        next();
      });
    }
  }
};
