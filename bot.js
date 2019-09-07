// required environment variables
const gcpProjectId = process.env.GCP_PROJ_ID
const username = process.env.USER_NAME
const paperkey = process.env.PAPERKEY

const Bot = require('keybase-bot')
const {Translate} = require('@google-cloud/translate');
var languageChooser = require('./language-chooser')

const bot = new Bot()
const translate = new Translate({gcpProjectId})

// message router
const onMessage = async (message) => {
  const channel = message.channel

  console.log(message.content.type)
  if (message.content.type == 'text') {
    const text = message.content.text.body
    const tokens = message.content.text.body.split()

    switch(tokens[0]) {
      case '/language':
        console.log(languageChooser)
        typeof languageChooser.requestLanguage(bot, message)
        break
    }
  } else if (message.content.type == 'reaction') {
      languageChooser.chooseLanguage(bot, translate, message)
  }
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
