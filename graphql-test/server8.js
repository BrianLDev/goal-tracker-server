// AUTHENTICATION AND EXPRESS MIDDLEWARE
// https://graphql.org/graphql-js/authentication-and-express-middleware/

var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    ip: String
  }
`);

const loggingMiddleware = (req, res, next) => {
  console.log('ip:', req.ip);
  next();
}

var root = {
  ip: function (args, request) {
    return request.ip;
  }
};

var app = express();
app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

/*
In a REST API, authentication is often handled with a header, that contains an auth token which proves what user is making this request. 
Express middleware processes these headers and puts authentication data on the Express request object. 
Some middleware modules that handle authentication like this are Passport, express-jwt, and express-session. 
Each of these modules works with express-graphql.

If you aren't familiar with any of these authentication mechanisms, we recommend using express-jwt because it's 
simple without sacrificing any future flexibility.

If you've read through the docs linearly to get to this point, congratulations! You now know everything you need to 
build a practical GraphQL API server.
*/