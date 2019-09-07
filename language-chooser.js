const Bot = require('keybase-bot')
const {Translate} = require('@google-cloud/translate');

module.exports = {
    chooseLanguage: function (bot, translate, message) {
      const reaction = message.content.reaction.b
      
      var lang = "en"
      switch(reaction) {
          case ":flag-gb:":
              lang = "en"
            break;
          case ":flag-af:":
              lang = "af"
            break;
        case ":flag-az:":
            lang = "az"
            break;
        case ":flag-ie:":
            lang = "ga";
            break;
        case ":flag-it:":
            lang = "it";
            break;
        case ":flag-jp:":
            lang = "ja"
            break;
        case ":flag-kr:":
            lang = "ko"
            break;
        case ":flag-by:":
            lang = "be"
            break;

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
        var flags = [":flag-gb:", ":flag-af:", ":flag-al:", ":flag-eg:", ":flag-az:", ":flag-ie:", ":flag-it:", ":flag-jp:", ":flag-kr:", ":flag-by:"]
        var i;
        bot.chat.send(channel, {body: "Select a language by clicking a flag"})
        for(i = 0; i<flags.length; i++){
             bot.chat.react(channel, messageId+1, flags[i]).then(() => console.log('Reaction Sent'))
        }
    }
  };
