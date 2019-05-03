import { ApolloServer } from 'apollo-server-express'
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
import cors from "cors";
import path from "path";
import jwt from "express-jwt"
import jwksRsa from "jwks-rsa"
getEnvironmentVariables()

// var jwtCheck = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
//   }),
//   audience: process.env.REACT_APP_AUTH0_AUDIENCE,
//   issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
//   algorithms: ['RS256']
// });




const start = async (connectionString, app) => {
  let opts = {}
  await mongoose.connect(
    connectionString,
    { ...opts, useNewUrlParser: true }
  )
  // await mongoose.connect(connectionString,
  //   {
  //     poolSize: 20,
  //     socketTimeoutMS: 480000,
  //     keepAlive: 300000,
  //     ssl: true,
  //     sslValidate: false,
  //     reconnectTries: 86400
  //   })
  // await connect(process.env.clientId, process.env.clientSecret, process.env.vaultUri)

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
  server.applyMiddleware({ app });
  var corsOptions = {
    origin: process.env.NODE_ENV == 'production' ? 'https://react-graphql-starter.azurewebsites.net' : 'localhost:3000',
    credentials: true
  };
  app.use(cors(corsOptions));


  app.listen({ port: config.port }, () =>
    console.log(`🚀 GQL server ready at http://localhost:${config.port}${server.graphqlPath}`)
  )
}

// start(process.env.ConnectionString)

// Initialize the express module and make it accessible via the app variable.
const app = express()
// app.use(jwtCheck);
start(config.dbUrl, app)

// app.get("/private", jwtCheck, function (req, res) {
//   res.json({
//     message: "hello world!"
//   })
// })
if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '..', 'build')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });
}




