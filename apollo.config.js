// folder의 depth가 여러개라도 인식함
module.exports = {
  client: {
    includes: ['src/**/*.tsx'],
    tagName: 'gql',
    service: {
      name: 'podcast-backend',
      url: 'http://localhost:4000/graphql',
    },
  },
};
// https://podcast-backend-tony.herokuapp.com/graphql
