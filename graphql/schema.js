const { gql } = require('apollo-server');


module.exports = gql`
  type User {
    id: Int!
    firstname: String!
    lastname: String!
    username: String!
    email: String!
    password: String!
    createdat: DateTime!
  }

  type Whisper {
    id: Int!
    text: String!
    whisperer: User!
    createdat: DateTime!
  }
`;
