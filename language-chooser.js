module.exports = {
    chooseLanguage: function (bot, translate, message) {
    },
    requestLanguage: function (bot, message) {
    }
  };

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
    console.log("salad")
    const messageId = message.Id
    console.log(messageId)
    var flags = [":flag-gb:", ":flag-az:", ":flag-al:", "flag-eg"]
    var i;
    for(i = 0; i<flags.length; i++){
        bot.chat.react(channel, messageId, flags[i]).then(() => console.log('saladdddd'))
    }
}