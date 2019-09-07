const Bot = require('keybase-bot')
const {Translate} = require('@google-cloud/translate');
function chooseLanguage(bot, translate, message){
    bot = new Bot()
    const channel = message.channel
    const text = message.content.text.body
    const reaction = message.content.reaction.b

    var lang = "en"
    switch(reaction) {
        case ":flag-gb:":
            lang = "en"
          break;
        case ":flag-az:":
            lang = "af"
          break;
        case ":flag-al:":
            lang = "sq"
            break;
        case ":flag-eg:":
            lang = "ar"
            break;
        default:
          lang = "en"
          break;
      } 

}

function requestLanguage(bot, message){
    const messageId = message.Id
    var flags = [":flag-gb:", ":flag-az:", ":flag-al:", "flag-eg"]
    var i;
    for(i = 0; i<flags.length; i++){
        bot.chat.react(channel, messageId, flags[i]).then(() => console.log('salad'))
    }
}