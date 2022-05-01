import { gql } from 'apollo-server';

import {
  getTasks,
} from './resolvers/tasks';

export const typeDefs = gql`
  enum Status {
    BACKLOG
    TO_DO
    ONGOING
    DONE
  }
  type Task {
    description: String!
    name: String!
    status: String!
  }
  type Query {
    getTasks ( numTasks: Int ): [ Task! ]!
  }
`;

export const resolvers = {
  Query: {
    getTasks,
  },
};
