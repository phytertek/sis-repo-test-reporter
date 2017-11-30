import { hash } from '../../../../../../.cache/typescript/2.6/node_modules/@types/bcrypt';

const { hashPassword, comparePassword } = require('./utils/bcrypt');
const { Types } = require('../database/utils');
const { todayPlusNDays } = require('../common/timeDate');
const { throwError } = require('../common/errors');

module.exports = {
  AuthToken: {
    Schema: {
      data: {
        type: String,
        required: true,
        unique: true
      },
      key: { type: String, required: true, unique: true }
    },
    Hooks: Schema => {
      Schema.pre('save', async function handleKeyHash(next) {
        try {
          const authToken = this;
          if (!authToken.isModified('key')) return next();
          authToken = await hashPassword(authToken.key);
          next();
        } catch (error) {
          throwError(error);
        }
      });
    }
  }
};
