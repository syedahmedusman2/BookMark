import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http'
export const client = new ApolloClient({
  link: new HttpLink({
    uri: '/.netlify/functions/bookmark',
    fetch,
  }),
  cache: new InMemoryCache()
});
// import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// export const client = new ApolloClient({
//  link: new HttpLink({  
//   uri: '/.netlify/functions/bookmarks',
//   cache: new InMemoryCache()
// }),
// cache: new InMemoryCache()


// })