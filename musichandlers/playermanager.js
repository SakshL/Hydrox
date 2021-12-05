
const {
  MessageEmbed
} = require("discord.js")
const config = require("../botconfig/config.json")
const ee = require("../botconfig/embed.json")
const emoji = require('../emoji.json')
const {
  format,
  delay,
  isrequestchannel,
  edit_request_message_queue_info,
  edit_request_message_track_info,
  arrayMove
} = require("../musichandlers/functions")
module.exports = async (client, message, args, type, extras) => {
  let method = type.includes(":") ? type.split(":") : Array(type)
  if (!message.guild) return;
  //just visual for the console

  let {
    channel
  } = message.member.voice;
  if(!channel) return message.channel.send("Please connect to voice channel first!")
  const permissions = channel.permissionsFor(client.user);
  if(!permissions) return message.channel.send("I can't fetch permissions! Please try again later")
  if (!permissions.has("CONNECT"))
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      
      .setTitle(`${emoji.error}I need permissions To Join your channel`)
    );
  if (!permissions.has("SPEAK"))
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      
      .setTitle(`${emoji.error} I need permissions to speak in your channel`)
    );

  if (method[0] === "song")
    require("./playermanagers/song")(client, message, args, type, extras); 
  else if (method[0] === "request")
    require("./playermanagers/request")(client, message, args, type);  
  else if (method[0] === "playlist")
    require("./playermanagers/playlist")(client, message, args, type);
  else if (method[0] === "similar")
    require("./playermanagers/similar")(client, message, args, type);
  else if (method[0] === "search")
    require("./playermanagers/search")(client, message, args, type);
  else if (method[0] === "skiptrack")
    require("./playermanagers/skiptrack")(client, message, args, type); 
  else if (method[0] === "playtop")
  require("./playermanagers/playtop")(client, message, args, type)
  else
    return message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      
      .setTitle(`${emoji.error} No valid search Term? ...`)
    );
}