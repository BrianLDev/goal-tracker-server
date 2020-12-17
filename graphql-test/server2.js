var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
// 2. RUNNING EXPRESS + GRAPHQL
// https://graphql.org/graphql-js/running-an-express-graphql-server/

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

/*
Since we configured graphqlHTTP with graphiql: true, you can use the GraphiQL tool to manually issue GraphQL queries. 
If you navigate in a web browser to http://localhost:4000/graphql, you should see an interface that lets you enter queries. 
It should look like:
{ hello }
{ "data": {
  "hello": "Hello world!" 
  }
}
*/
