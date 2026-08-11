import {serve as _serve} from '@hono/node-server'
import {readFile} from 'node:fs/promises'
import {createSecureServer} from 'node:http2'

const CERT = process.env['CERT']!
const KEY = process.env['KEY']!
const IS_TLS = CERT && KEY
const PORT = Number(process.env['PORT']) || (IS_TLS ? 443 : 80)

export const serve = async (handler: (req: Request) => Promise<Response> | Response) => {
  if (IS_TLS) {
    _serve({
      port: PORT,
      createServer: createSecureServer,
      serverOptions: {
        key: await readFile(KEY, 'utf8'),
        cert: await readFile(CERT, 'utf8'),
      },
      fetch: handler,
    })
  } else {
    _serve({port: PORT, fetch: handler})
  }

  console.log('Node Listen', new URL(`http${IS_TLS ? 's' : ''}://localhost:${PORT}`).toString())
}
