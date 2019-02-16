import { ApolloServer } from 'apollo-server'
import { loadTypeSchema } from './utils/schema'
import { authenticate } from './utils/auth'
import { merge } from 'lodash'
import config from './config'
import { connect } from './db'
import product from './types/product/product.resolvers'
import coupon from './types/coupon/coupon.resolvers'
import user from './types/user/user.resolvers'
import mongoose from 'mongoose'
import { config as getEnvironmentVariables } from "dotenv"
import express from "express";

getEnvironmentVariables()


const start = async (connectionString) => {
  const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
  `
  const types = ['product', 'coupon', 'user']
  const schemaTypes = await Promise.all(types.map(loadTypeSchema))

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, product, coupon, user),
    async context({ req }) {
      const user = await authenticate(req)
      return { user }
    }
  })
  await mongoose.connect(connectionString)
  // await connect(process.env.clientId, process.env.clientSecret, process.env.vaultUri)
  const { url } = await server.listen({ port: config.port })

  console.log(`GQL server ready at ${url}`)
}

start(process.env.ConnectionString)

// Initialize the express module and make it accessible via the app variable.
const app = express()

app.get('/', async (req, res) => {
  res.send('Hello World!')
});

