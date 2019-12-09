const { gql } = require('apollo-server-express');


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
    signin(payload: AuthPayload): AuthResponse
  }

  type Mutation {
    createUser(payload: NewUser): AuthResponse
  }
`;
