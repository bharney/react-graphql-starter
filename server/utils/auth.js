import { User } from '../types/user/user.model'
import cuid from 'cuid'
import jwt from "jsonwebtoken"
import config from "../config"

export const newApiKey = () => {
  return cuid()
}

export const authenticate = async req => {
  const token = req.headers.authorization
  return jwt.verify(token, config.secrets.jwt, async (err, decoded) => {
    if (err) {
      return
    }
    var apiKey = decoded.apiKey
    const user = await User.findOne({ apiKey })
      .select('-password')
      .lean()
      .exec()

    return user

  })
}
