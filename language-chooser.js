

const Bot = require('keybase-bot')
const {Translate} = require('@google-cloud/translate');

function chooseLanguage(bot, message){
    

}

function requestLanguage(bot, message){
    
}

module.exports = {
    chooseLanguage: function (bot, translate, message) {
    bot = new Bot()
    const channel = message.channel
    const text = message.content.text.body
    const reaction = message.content.reaction.b

    var lang = "en"
    switch(reaction) {
        case ":flag-gb:":
            lang = "en"
          break;
        case ":flag-af:":
            lang = "af"
          break;
        case ":flag-al:":
            lang = "sq"
            break;
        case ":flag-eg:":
            lang = "ar"
            break;
        case "flag-az":
            lang = "az"
        default:
          lang = "en"
          break;
      } 

      console.log(lang)
    },
    requestLanguage: function (bot, message) {
        console.log("salad") 
        const messageId = message.id
        console.log(messageId)
        const channel = message.channel
        var flags = [":flag-gb:", ":flag-af:", ":flag-al:", ":flag-eg:", ":flag-az:"]
        var i;
        bot.chat.send(channel, {body: "Select a language by clicking a flag"})
        for(i = 0; i<flags.length; i++){
             bot.chat.react(channel, messageId, flags[i]).then(() => console.log('saladdddd'))
        }
    }
  };