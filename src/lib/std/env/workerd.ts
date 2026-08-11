import {env} from 'cloudflare:workers'

export const getEnv = (key: keyof Cloudflare.Env): string | undefined => {
  return env[key]
}

export const getEnvRequired = (key: keyof Cloudflare.Env): string => {
  if (!env[key]) throw new Error(`Env ${key} is required`)

  return env[key]!
}
