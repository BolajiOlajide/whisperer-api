const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const config = require('lazy-config');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createServer } = require('http');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const context = require('./utils/context');
const onConnect = require('./utils/onConnect');


const app = express();
const { graphqlpath, port, subscriptionsPath } = config.app

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const apolloOpts = {
  introspection: true,
  typeDefs,
  resolvers,
  playground: true,
  debug: config.isDev,
  cors: true,
  context,
  formatError: (error) => {
    const shouldMask = error.message.startsWith("Database Error: ") && config.isProd;
    if (shouldMask) {
      return new Error('Internal server error');
    }

    return error;
  },
  validationRules: [depthLimit(5)], // i dont like stress
  subscriptions: { onConnect, path: subscriptionsPath }
};
const server = new ApolloServer(apolloOpts);

app.use(cors())
server.applyMiddleware({ app, path: graphqlpath });

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => console
  .info(`🚀 Server ready at http://localhost:${port}${graphqlpath}

🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`)
)
