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

  type Query {
    users: [User]!,
    profile: User!,
    whispers: [Whisper]!
  }
`;
