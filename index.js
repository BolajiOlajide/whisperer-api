const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const logger = require('winston');
const config = require('lazy-config');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');


const app = express();
const { graphqlpath, port } = config.app

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const apolloOpts = {
  introspection: config.isDev,
  typeDefs,
  resolvers,
  playground: true,
  debug: config.isDev,
  cors: true
};
const server = new ApolloServer(apolloOpts);

server.applyMiddleware({ app, path: graphqlpath });

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}/${graphqlpath}`)
)
