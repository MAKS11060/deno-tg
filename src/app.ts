import {getEnvRequired} from '#env'
import {Bot, webhookCallback} from 'grammy'
import {app} from './grammy/app.ts'

const bot = new Bot(getEnvRequired('BOT_TOKEN'), {botInfo: JSON.parse(process.env.BOT_INFO!)})

bot.use(app)

export const grammyHandler = webhookCallback(bot, 'std/http', {
  secretToken: getEnvRequired('WEBHOOK_SECRET'),
})
