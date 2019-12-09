const { gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
module.exports = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    createdAt: DateTime!
    author: String
  }

  type Whisper {
    id: ID!
    text: String!
    whisperer: User!
  }
`;
