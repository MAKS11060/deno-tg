const encoder = new TextEncoder()

export interface BasicAuth {
  username: string
  password: string
}

export const basicAuth = (cred: BasicAuth) => {
  return `Basic ${encoder.encode(`${cred.username}:${cred.password}`).toBase64()}`
}
