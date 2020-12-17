// MUTATIONS AND INPUT TYPES EXAMPLES
// start up server7 then run this with `node server7b`

/*
To call a mutation, you must use the keyword mutation before your GraphQL query. 
To pass an input type, provide the data written as if it's a JSON object. 
For example, with the server defined above, you can create a new message and return the id of the new message with this operation:

mutation {
  createMessage(input: {
    author: "andy",
    content: "hope is a good thing",
  }) {
    id
  }
}
*/
const fetch = require('node-fetch');

var author = 'andy';
var content = 'hope is a good thing';
var query = `
mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) {
    id
  }
}`;

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: {
      input: {
        author,
        content,
      }
    }
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));

  /*
One particular type of mutation is operations that change users, like signing up a new user. 
While you can implement this using GraphQL mutations, you can reuse many existing libraries if you learn about GraphQL 
with authentication and Express middleware.
  */