import { CorsOptions } from 'cors'
import { allowedOrigins } from './allowedOrigins'

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    console.log("the current origin is: ", origin)
    if (origin) {
      if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    } else {
      callback(null, true)
    }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
