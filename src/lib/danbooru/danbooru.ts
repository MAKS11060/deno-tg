import {getEnv, getEnvRequired} from '#env'
import createClient from 'openapi-fetch'
import type {components, paths} from './danbooru.oas.ts'

export type DanbooruPost = components['schemas']['post']

export const danbooruUri = getEnv('DANBOORU_URL') || 'https://danbooru.donmai.us'
export const danbooruApi = createClient<paths>({
  baseUrl: danbooruUri,
  headers: {
    'User-Agent': getEnvRequired('DANBOORU_USER_AGENT') || 'github.com/MAKS11060/tg-maks11060_bot user #1055579',
  },
})

danbooruApi.use({ // Log error
  onResponse({request, response}) {
    if (!response.ok) {
      console.log(
        Object.fromEntries(request.headers.entries()),
        Object.fromEntries(response.headers.entries()),
      )
    }
  },
})

if (getEnv('DANBOORU_PROXY')) {
  const proxyURL = new URL(getEnv('DANBOORU_PROXY')!)
  danbooruApi.use({
    onRequest({request}) {
      const headers = new Headers()
      for (const [key, val] of request.headers) {
        headers.set(`x-${key}`, val)
      }

      return new Request(`${proxyURL}${request.url}`, {
        method: request.method,
        headers,
        body: request.body,
      })
    },
  })
}
