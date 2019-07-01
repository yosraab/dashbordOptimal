export const remoteAPI = 'http://localhost:5000/graphql';
const { createApolloFetch } = require('apollo-fetch');
// export const remteAPI = 'http://localhost:3099';
// export const remoteAPI = 'https://secureKey.optimal.com.tn';
export const fetch = createApolloFetch({
    uri: 'http://localhost:5000/graphql',
  });