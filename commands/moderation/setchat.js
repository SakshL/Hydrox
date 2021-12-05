const Discord = require("discord.js")
const db = require("quick.db")
const emoji = require('../../emoji.json')

module.exports = {
 name: "setchat",
 async run (client, message, args)  {
 
 let urmom = message.mentions.channels.first() 
 
 if(!urmom) { 
 return message.channel.send("Please Mention the channel first")
 }
 

 
 db.set(`chatchannel_${message.guild.id}`, urmom.id) 
 
 message.channel.send(`Chat Bot Channel is set as ${urmom}`) 
 }
}
