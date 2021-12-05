const Discord = require("discord.js");
const emoji = require('../../emoji.json')

module.exports = {
  name: "ping",
  description: "*Show Client Ping*",
  category: "General",
  usage: "ping",
  run: async (client, message, args) => {
      const ping = new Discord.MessageEmbed() // Prettier()
        .setTitle(":ping_pong: Pong!")
        .addField("My Ping: ", `${Date.now() - message.createdTimestamp} ms`)
        .addField("API Ping (Websocket): ", `${Math.round(client.ws.ping)} ms`)
        .setFooter("Requested by " + `${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }))
        .setColor("RANDOM")
        .setTimestamp();
      message.lineReply(ping);
  }
}