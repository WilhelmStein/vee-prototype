import { ApolloClient, InMemoryCache } from '@apollo/client';
import appConfig from './appConfig';

const apolloClient = new ApolloClient({
  uri: appConfig.backendURL,
  cache: new InMemoryCache(),
});

export default apolloClient;
