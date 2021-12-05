const Discord = require("discord.js")
const db = require('quick.db')
const emoji = require('../../emoji.json')

module.exports = {
  name: "chatbot-disable",
  category: "moderation",
  usage: "chatbot disable",
  description: " disable chatbot channel",
  run: async(client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATION")) {
      return message.channel.send("you need permission to ADMINISTRATION ");
    }
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Please Mention the channel first")
    }
    db.delete(`chatbot_${message.guild.id}`, channel.id)
    
    message.channel.send(`chatbot Channel is disable!`)
  }
}