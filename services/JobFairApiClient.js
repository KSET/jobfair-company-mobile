import ApolloClient from 'apollo-client';
import { JOBFAIR_URL } from 'react-native-dotenv';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const link = createHttpLink({ uri: JOBFAIR_URL });

// const errorLink = onError(({ networkError = {}, graphQLErrors }) => {
//   if (graphQLErrors) {
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//       ),
//     );
//   }
//
//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });
//
// // use with apollo-client
// const link = errorLink.concat(httpLink);

const JobFairApiClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),

});
export default JobFairApiClient;
