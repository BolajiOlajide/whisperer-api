const { gql } = require('apollo-server-express');


// why is `signin` a mutation ???? FOH!!! Looool
// https://stackoverflow.com/questions/50189364/shouldnt-the-login-be-a-query-in-graphql#answer-50190570
module.exports = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
  }

  type Whisperer {
    id: Int!
    username: String!
  }

  type Whisper {
    id: Int!
    text: String!
    whisperer: Whisperer!
  }

  type Profile {
    id: Int!
    username: String!
    email: String!
    whispers: [Whisper]!
    name: String!
  }

  input NewUser {
    password: String!
    email: String!
    confirmPassword: String!
    name: String!
  }

  input AuthPayload {
    email: String!
    password: String!
  }

  input WhisperPayload {
    text: String!
  }

  input CommentPayload {
    comment: String!
    whisper: Int!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  type Comment {
    id: Int!
    comment: String!
    whisper: Whisper!
    commenter: Whisperer!
  }

  type Query {
    users(limit: Int, page: Int): [Whisperer]!,
    profile: Profile!,
    whispers(limit: Int, page: Int): [Whisper]!
    fetchWhisperComments(whisperId: Int!, limit: Int, page: Int): [Comment]!
  }

  type Mutation {
    createUser(payload: NewUser): AuthResponse
    signin(payload: AuthPayload): AuthResponse
    createWhisper(payload: WhisperPayload): Whisper
    createComment(payload: CommentPayload): Comment
  }

  type Subscription {
    whisperAdded: Whisper!
    commentAdded: Comment!
  }
`;
