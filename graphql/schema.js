const { gql } = require('apollo-server');


module.exports = gql`
  type User {
    id: Int!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    createdAt: DateTime!
    author: String
  }

  type Whisper {
    id: Int!
    text: String!
    whisperer: User!
  }
`;
