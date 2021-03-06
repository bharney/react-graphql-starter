import { merge } from 'lodash'
import { config as getEnvironmentVariables } from "dotenv"
getEnvironmentVariables()
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: process.env.port || 4002,
  secrets: {
    jwt: process.env.REACT_APP_JWT_SECRET,
    jwtExp: '100d'
  }
}

let envConfig = {}

switch (env) {
  case 'prod':
  case 'production':
    envConfig = require('./prod').config
    break
  case 'dev':
  case 'development':
    envConfig = require('./dev').config
    break
  case 'test':
  case 'testing':
    envConfig = require('./testing').config
    break
  default:
    envConfig = require('./dev').config
}

export default merge(baseConfig, envConfig)
