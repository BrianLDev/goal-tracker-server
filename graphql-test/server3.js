// 3. GRAPHQL CLIENTS
// https://graphql.org/graphql-js/graphql-clients/
/*

1. start up server2 with `node server2`, then run the code examples below to access the API

2. Paste the following into terminal and you should get the "Hello world" data back

curl -X POST \
-H "Content-Type: application/json" \
-d '{"query": "{ hello }"}' \
http://localhost:4000/graphql


3. In your browser, go to http://localhost:4000/graphql, then open up the developer tools and paste in the following to get "Hello world" back

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({query: "{ hello }"})
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));


4. shut down server2 and launch server5 with `node server5`

5. open up a seperate terminal window and run the code below with `node server3`
note - make sure that node-fetch is installed first using `npm install node-fetch`
*/
const fetch = require('node-fetch');
if (!globalThis.fetch) {
	globalThis.fetch = fetch;
}

var dice = 3;
var sides = 6;
var query = `query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}`; // Using $dice and $sides as variables in GraphQL means we don't have to worry about escaping on the client side.

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { dice, sides },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
