import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'

export const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://graphql-gateway.axieinfinity.com/graphql',
    fetch: fetch
  }),
  fetchOptions: {
    mode: 'no-cors'
  },
  cache: new InMemoryCache()
})
