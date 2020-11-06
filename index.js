const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const config = require('lazy-config');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createServer } = require('http');
const cookieParser = require('cookie-parser');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const context = require('./utils/context');
const onConnect = require('./utils/onConnect');


const app = express();

const { graphqlpath, port, subscriptionsPath } = config.app

const validOrigins = ['http://localhost:3000', 'https://whisperer-ui.herokuapp.com'];
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

app.use(cors({ credentials: true, origin: validOrigins }));
app.use(cookieParser());
app.set('trust proxy', 1);
server.applyMiddleware({ app, path: graphqlpath, cors: false });

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => console
  .info(`🚀 Server ready at http://localhost:${port}${graphqlpath}

🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`)
);
