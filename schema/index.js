const { gql } = require('apollo-server-express');


// why is `signin` a mutation
// https://stackoverflow.com/questions/50189364/shouldnt-the-login-be-a-query-in-graphql#answer-50190570
module.exports = gql`
  type User {
    id: Int!
    firstname: String!
    lastname: String!
    username: String!
    email: String!
  }

  type Whisper {
    id: Int!
    text: String!
    whisperer: User!
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

  type AuthResponse {
    user: User!
    token: String!
  }

  type Query {
    users: [User]!,
    profile: User!,
    whispers: [Whisper]!
  }

  type Mutation {
    createUser(payload: NewUser): AuthResponse
    signin(payload: AuthPayload): AuthResponse
  }
`;
