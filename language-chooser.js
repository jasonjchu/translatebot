const Bot = require('keybase-bot')
const {Translate} = require('@google-cloud/translate');

module.exports = {
    chooseLanguage: function (bot, db, message) {
    console.log("h")
    const reaction = message.content.reaction.b
    console.log(message)
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
        case ":flag-bg:":
            lang = "bg"
            break;
        case ":flag-ad:":
            lang = "ca"
            break;
        case ":flag-cn:":
            lang = "zh-CN"
            break;
        case ":flag-hk:":
            lang = "zh-TW"
            break;
        case ":flag-fr:":
            lang = "fr"
            break;
        case ":flag-de:":
            lang = "de"
            break;
        case ":flag-gr:":
            lang = "el"
            break;
        case ":flag-mx:":
            lang = "es"
            break;
        case ":flag-rs:":
            lang = "sr"
            break;
        case ":flag-ru:":
            lang = "ru"
            break;
        default:
          lang = "en"
          break;
      } 
      let docRef = db.collection('userSettings').doc(message.sender.username);
        console.log("70")
        let setTest = docRef.set({
          lang: lang
        });
      console.log(lang)
    },
    requestLanguage: function (bot, message) {
        console.log("salad") 
        const messageId = message.id
        console.log(messageId)
        const channel = message.channel
        var flags = [":flag-gb:", ":flag-af:", ":flag-al:", ":flag-eg:", ":flag-az:", ":flag-ie:", ":flag-it:", ":flag-jp:", ":flag-kr:", ":flag-by:", ":flag-bg:", ":flag-ad:", ":flag-cn:", ":flag-hk:", ":flag-fr:", ":flag-de:", ":flag-gr:", ":flag-mx:", ":flag-rs:", ":flag-ru:"]
        var i;
        bot.chat.send(channel, {body: "Select a language by clicking a flag"})
        for(i = 0; i<flags.length; i++){
             bot.chat.react(channel, messageId+1, flags[i]).then(() => console.log('Reaction Sent'))
        }
    }
  };
