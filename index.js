const { ApolloServer } = require('apollo-server');
const logger = require('winston');
const config = require('lazy-config');

const typeDefs = require('./graphql/schema');


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

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  logger.info(`🚀  Server ready at ${url}`);
}).catch(logger.error);
