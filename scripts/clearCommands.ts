#!/usr/bin/env -S node --watch --env-file .env

import {getEnvRequired} from '#env'
import {Api} from 'grammy'

const BOT_TOKEN = getEnvRequired('BOT_TOKEN')

const api = new Api(BOT_TOKEN!)

console.log(
  'setMyCommands clear',
  await api.setMyCommands([]),
)
