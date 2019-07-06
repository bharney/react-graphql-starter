import { User } from './user.model'
import { AuthenticationError, ForbiddenError } from 'apollo-server'
import { newApiKey } from '../../utils/auth'
import jwt from "jsonwebtoken"
import config from "../../config"
const me = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return ctx.user
}

const updateMe = (_, args, ctx) => {
  if (!ctx.user) {
    throw new AuthenticationError()
  }
  return User.findByIdAndUpdate(ctx.user._id, args.input, { new: true })
    .select('-password')
    .lean()
    .exec()
}

const signup = async (_, args) => {
  const user = await User.create({ ...args.input, apiKey: newApiKey() })
  const token = jwt.sign({ apiKey: user.apiKey }, config.secrets.jwt, { expiresIn: config.secrets.jwtExp });
  return {
    user,
    token
  };
}

const login = async (_, args, ctx) => {
  let user = await User.findOne({ email: args.input.email }, function (err, result) {
    if (err) {
      return err;
    }
    return result;
  })
  console.log(user)
  if (user == null) {
    return new AuthenticationError()
  }
  return user.checkPassword(args.input.password)
    .then(same => {
      if (same) {
        const token = jwt.sign({ apiKey: user.apiKey },
          config.secrets.jwt,
          { expiresIn: config.secrets.jwtExp });
        return {
          user,
          token
        };
      }
      return new AuthenticationError()
    })
}

export default {
  Query: {
    me
  },
  Mutation: {
    updateMe,
    signup,
    login
  }
}
