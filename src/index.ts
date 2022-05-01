import { ApolloServer } from 'apollo-server-cloud-functions';

import { resolvers, typeDefs } from './schema';

const { env } = process;
const { TWILIO_KANBAN_GRAPHQL_SERVER_AUTH_TOKEN } = env;

const context = ( { req } ) => {
  const { headers } = req;
  const graphAuthToken = headers[ 'x-twilio-kanban-graphql-server-auth-token' ];

  if ( graphAuthToken !== TWILIO_KANBAN_GRAPHQL_SERVER_AUTH_TOKEN ) throw new Error( 'Not authorized.' );
};

const server = new ApolloServer( {
  context,
  resolvers,
  typeDefs,
} );

exports.handler = server.createHandler();
