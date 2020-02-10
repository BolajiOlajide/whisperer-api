const { gql } = require('apollo-server-express');


// why is `signin` a mutation ???? FOH!!! Looool
// https://stackoverflow.com/questions/50189364/shouldnt-the-login-be-a-query-in-graphql#answer-50190570
module.exports = gql`
  type User {
    id: Int!
    firstname: String!
    lastname: String!
    username: String!
    email: String!
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
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    whispers: [Whisper]!
  }

  input NewUser {
    firstname: String!
    password: String!
    lastname: String!
    email: String!
  }

  input AuthPayload {
    email: String!
    password: String!
  }

  input WhisperPayload {
    text: String!
  }

  type AuthResponse {
    user: User!
    token: String!
  }

  type Query {
    users: [Whisperer]!,
    profile: Profile!,
    whispers: [Whisper]!
  }

  type Mutation {
    createUser(payload: NewUser): AuthResponse
    signin(payload: AuthPayload): AuthResponse
    createWhisper(payload: WhisperPayload): Whisper
  }

  type Subscription {
    whisperAdded: Whisper
  }
`;
