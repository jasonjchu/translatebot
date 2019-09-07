// required environment variables
const gcpProjectId = process.env.GCP_PROJ_ID
const username = process.env.USER_NAME
const paperkey = process.env.PAPERKEY
let serviceAccount = require('./translatebot-d6e97-firebase-adminsdk-4zroe-742360124e.json');

const Bot = require('keybase-bot')
const {Translate} = require('@google-cloud/translate');
var languageChooser = require('./language-chooser')
const admin = require('firebase-admin');

const bot = new Bot()
const translate = new Translate({gcpProjectId})

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

// message router
const onMessage = async (message) => {
  console.log(message)

  console.log(message)
  console.log(message.content.type)
  if (message.content.type == 'text') {
    const text = message.content.text.body
    const tokens = message.content.text.body.split(' ')

    if (text.charAt(0) == '/') {
    	console.log(tokens[0])
    	switch(tokens[0]) {
    	  case '/language':
    	    languageChooser.requestLanguage(bot, message)
    	    break
    	  case '/translate':
	    doTranslate(message, db, translate, bot)
    	    break
    	}
    } else {
	doTranslate(message, db, translate, bot)
    }
  } else if (message.content.type == 'reaction') {
      /*
      Example usage of saving to userSettings/testUser:

        let docRef = db.collection('userSettings').doc('testUser');
        let setTest = docRef.set({
          lang: 'XD'
        });

      */

      languageChooser.chooseLanguage(bot, db, message)
  }
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

async function doTranslate(message, db, translate, bot) {
  const sender = message.sender.username
  const text = message.content.text.body
  const channel = message.channel
  console.log(sender)
  db.collection('userSettings').doc(sender).get()
    .then(async (doc) => {
        const untranslated = text.charAt(0) == '/' ? text.substring(11) : text
        const target = doc.data().lang
        const [translation] = await translate.translate(untranslated, target);
        console.log(`Text: ${text}`);
        console.log(`Translation: ${translation}`);
        bot.chat.send(channel, {body: translation})
    })
    .catch(async (err) => {
      const untranslated = text.substring(11)
      const target = 'en'
      const [translation] = await translate.translate(untranslated, target);
      console.log(`Text: ${text}`);
      console.log(`Translation: ${translation}`);
      bot.chat.send(channel, {body: translation})
    });
}

function shutDown() {
  bot.deinit().then(() => process.exit())
}

process.on('SIGINT', shutDown)
process.on('SIGTERM', shutDown)

main()
