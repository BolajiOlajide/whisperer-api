const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const logger = require('winston');
const config = require('lazy-config');
const cors = require('cors');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const context = require('./utils/context');


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
  cors: true,
  context
};
const server = new ApolloServer(apolloOpts);

app.use(cors())
server.applyMiddleware({ app, path: graphqlpath });

app.listen({ port }, () =>
  logger.info(`🚀 Server ready at http://localhost:${port}/${graphqlpath}`)
)
