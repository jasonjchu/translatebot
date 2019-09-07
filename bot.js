const Bot = require('keybase-bot')

const bot = new Bot()

const onMessage = message => {
  const channel = message.channel
  bot.chat.send(channel, {body: 'Message received.'})
}

function main() {
  const username = process.env.USER_NAME
  const paperkey = process.env.PAPERKEY

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
