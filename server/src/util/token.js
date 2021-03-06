import * as JWT from 'jsonwebtoken'

const LAMBDA_JWT_RSA_PUBLIC_KEY = process.env.WAB_LAMBDA_JWT_RSA_PUBLIC_KEY.replace(/\\n/g, '\n')

export function verifyToken (token) {
  return new Promise((r, e) => JWT.verify(
    token,
    process.env.WAB_JWT_SECRET,
    { algorithms: ['HS256'] },
    (err, data) => err ? e(err) : r(data)
  ))
}

export function signToken (payload) {
  return JWT.sign(payload, process.env.WAB_JWT_SECRET, { algorithm: 'HS256' })
}

export function verifyUnsubscribeToken (token) {
  return new Promise((r, e) => JWT.verify(
    token,
    LAMBDA_JWT_RSA_PUBLIC_KEY,
    { algorithms: ['RS256'] },
    (err, data) => err ? e(err) : r(data)
  ))
}

export function setCookieTokenHeader (token) {
  return `token=${token}; expires=Thu, 01 Jan 2030 00:00:00 GMT; Path=/; HttpOnly; SameSite=Lax`
}

export function unsetCookieTokenHeader () {
  return 'token=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}
