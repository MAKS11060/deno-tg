import {HTTPError} from '#lib/openapi-fetch.ts'
import {GrammyError} from 'grammy'
import {grammyHandler} from './src/app.ts'

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const uri = new URL(request.url)

    // Grammy route
    if (request.method === 'POST' && uri.pathname === '/tg/webhook') {
      try {
        return await grammyHandler(request)
      } catch (e) {
        if (e instanceof GrammyError) {
          console.error(e.name, e.description, e.message, e.parameters)
          console.error(e.payload)
        } else if (e instanceof HTTPError) {
          console.error(e)
        } else if (e instanceof Error) {
          console.error('%cERR', 'color: red', e)
        }

        return Response.json({ok: false}, {status: 400})
      }
    }

    // default
    return Response.redirect('https://github.com/MAKS11060/tg-maks11060_bot?ref=workerd')
  },
} satisfies ExportedHandler<Env>
