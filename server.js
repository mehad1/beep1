var Botkit = require('Botkit')

var accessToken = preocess.env.FACEBOOK_PAGE_ACCESS_TOKEN
var verifyToken = process.env.FACEBOOK_VERIFY_TOKEN
var port = process.env.port

if (!accessToken) throw new Error('FACEBOOK_PAGE_ACCESS_TOKEN is required but missing')
if (!verifyToken) throw new Error('FACEBOOK_VERIFY_TOKEN is required but missing')
if (!port) throw new Error('PORT is required but missing')

var controller = Botkit.facebookbot({
  access_token: accessToken,
  verify_token: verifyToken
})

var bot = controller.spawn()

controller.setupWebserver(port, function(err, webserver){
  if (err) return console.log(err)
  controller.createWebhookEndpoints(webserver, bot, function(){
    console.log('Ready player 1')
  })
})

controller.hears(['hello','hi'], 'message received', function(bot, message){
  bot.reply(message, 'Helo!')
  bot.reply(message, 'I want to show you something')
  bot.reply(message, {

    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'This is test text',
        buttons:[{
          type: 'web_url',
          url: 'https://www.oculus.com/en-us/rift/',
          title: 'Open Web URL'
        }, {
          type: 'postback',
          title: 'cat',
          payload: 'show_cat'
        }, {
          type: 'postback',
          title: 'dog',
          payload: 'show_dog'
        }]
      }
    }
  })
})

controller.on('facebook_postback', function (bot,message){
  swich(message.payload){
    case 'show_cat':
    bot.reply(message, {
      attachment: {
        type: 'image',
        payload: {
          url: 'http://i.imgur.com/zYIlgBl.png'
        }
      }
    })
    break
    case 'show_dog':
    bot.reply(message, {
      attachment: {
        type: 'image',
        payload: {
          url: 'https://beepboophq.storage.googleapis.com/_web/en_US/bot.882475.jpg'
        }
      }
    })
    break
  }
})
