const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
q = faunadb.query

// require("dotenv").config()

const client = new faunadb.Client({
  secret: 'fnAD83SN8aACCL2M5lujWwr2zJ7UWVB-CK73e656',
})
const typeDefs = gql`
  type Query {
    bookmarks: [Bookmark!]
  }
  type Mutation {
    addBookmark(url: String!, description: String, title: String!): Bookmark
    delBookmark(id: ID!): Bookmark
  }
  type Bookmark {
    id: ID!
    url: String!
    title: String!
    description: String
  }
`

const resolvers = {
  Query: {
    bookmarks: async () => {
      try {
        const result = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection("bookmarks"))),
            q.Lambda(x => q.Get(x))
          )
        )
        const data = result.data.map(t => {
          return {
            id: t.ref.id,
            url: t.data.url,
            title: t.data.title,
            description: t.data.description,
          }
        })
        return data
      } catch (err) {
        console.log(err)
        return err.toString()
      }
    },
  },
  Mutation: {
    addBookmark: async (_, { url, title, description }) => {
      try {
        const result = await client.query(
          q.Create(q.Collection("bookmarks"), {
            data: { url: url, title: title, description: description },
          })
        )
        console.log(result.ref.id)
        return result.data.data
      } catch (error) {
        return error.toString()
      }
    },
    delBookmark: async (_, { id }) => {
      try {
        const result = await client.query(
          q.Delete(q.Ref(q.Collection("bookmarks"), id))
        )
        return result.data
      } catch (error) {
        return error
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }