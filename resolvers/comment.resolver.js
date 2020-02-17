const knex = require('../db');
const { authError } = require('../utils/errors');
const { COMMENT_TABLE_NAME } = require('../utils/constants');
const { checkLimitPageExist } = require('../utils/pagination');


exports.commentQueries = {
  fetchWhisperComments: async (_, args, context) => {
    if (!context.user) return authError();
    checkLimitPageExist(args);
    console.log(args)

    const { whisperId } = args;

    return knex(COMMENT_TABLE_NAME)
      .select()
      .where('whisper', whisperId);
  }
};

exports.commentMutations = {
  createComment: async (_, args, context) => {
    if (!context.user) return authError();

    const userId = context.user.id;
    const dbPayload = { ...args.payload, commenter: userId };
    const [commentId] = await knex(COMMENT_TABLE_NAME)
      .insert(dbPayload);

    return { ...args.payload, id: commentId, commenter: userId };
  }
};

exports.commentSubscriptions = {}
