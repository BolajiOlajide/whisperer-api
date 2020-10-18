const knex = require('../db');
const { userQueries, userMutations } = require('./user.resolver');
const {
  whisperQueries,
  whisperMutations,
  whisperSubscription
} = require('./whisper.resolver');
const {
  commentMutations,
  commentQueries,
  commentSubscriptions
} = require('./comment.resolver');
const { USER_TABLE_NAME, WHISPER_TABLE_NAME } = require('../utils/constants');

module.exports = {
  Whisper: {
    whisperer: (parent, _, context) => {
      if (parent.whisperer && parent.whisperer.id) {
        return parent.whisperer
      }
      return context.userLoader.load(parent.whisperer);
    }
  },
  Comment: {
    commenter: (parent, _, context) => {
      return context.userLoader.load(parent.commenter);
    },
    // not using dataloader here so it'll fetch for each comment found
    // commenter: parent => knex(USER_TABLE_NAME)
    //   .select().where('id', parent.commenter).first(),
    whisper: parent => {
      // another candidate for a data loader because this is called 3times
      // and I'm too lazy to find out why
      return knex(WHISPER_TABLE_NAME)
        .select()
        .where('id', parent.whisper)
        .first();
    }
  },
  Query: {
    ...userQueries,
    ...whisperQueries,
    ...commentQueries
  },
  Mutation: {
    ...whisperMutations,
    ...userMutations,
    ...commentMutations
  },
  Subscription: {
    ...whisperSubscription,
    ...commentSubscriptions
  }
};
