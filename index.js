const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'MBA Personal',
    author: 'Josh Kaufman',
  },
  {
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
  },
];

const posts = [
  {
    title: 'ReactJS + Apollo',
    description: 'Implement Apollo Client in ReactJS',
    books:[]
  },{
    title: 'Apollo Server',
    description: 'Implement Apollo Server with NodeJS',
    books: books
  },
];


// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }
  
  type Post {
    title: String!
    description: String!
    books: [Book]
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    listBooks(id: Int!): [Book]
    listPosts: [Post]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    listBooks: (parent, arguments) => {
      console.table(arguments)
      return books;
    },
    listPosts: () => posts,
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});