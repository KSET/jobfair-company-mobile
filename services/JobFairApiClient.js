import ApolloClient from 'apollo-client';
import { JOBFAIR_URL } from 'react-native-dotenv';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import AuthService from './AuthService';

const httpLink = createHttpLink({ uri: JOBFAIR_URL });

const authLink = setContext((_, { headers }) =>
  AuthService.getAuthToken().then(token => ({
    headers: {
      ...headers,
      authorization: token ? `jwt ${token}` : '',
    },
  })),
);

const JobFairApiClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),

});
export default JobFairApiClient;
