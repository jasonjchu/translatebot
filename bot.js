// required environment variables
const gcpProjectId = process.env.GCP_PROJ_ID
const username = process.env.USER_NAME
const paperkey = process.env.PAPERKEY

const Bot = require('keybase-bot')
const {Translate} = require('@google-cloud/translate');

const bot = new Bot()
const translate = new Translate({gcpProjectId})

const onMessage = async (message) => {
  const channel = message.channel
  console.log(message)
  const text = message.content.text.body
  const untranslated = text.substring(11)
  const target = 'en'
  const [translation] = await translate.translate(untranslated, target);
  console.log(`Text: ${text}`);
  console.log(`Translation: ${translation}`);
  bot.chat.send(channel, {body: translation})
}

async function main() {
  bot
    .init(username, paperkey, {verbose: false})
    .then(() => {
      console.log('Translatebot initialized.')
  
      bot.chat.watchAllChannelsForNewMessages(onMessage)
    })
    .catch(error => {
      console.error(error)
      shutDown()
    })
}

function shutDown() {
  bot.deinit().then(() => process.exit())
}

process.on('SIGINT', shutDown)
process.on('SIGTERM', shutDown)

main()
