const Discord = require("discord.js")
const db = require("quick.db")
const colors = require('./../../colors.json')
const emoji = require('../../emoji.json')
module.exports = {
name: "whitelist-add",
run: async (client, message, args) => {
const guildicon = message.guild.iconURL();
if(message.author.id === message.guild.ownerID) {
 let user = message.mentions.users.first()
if(!user) {return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`${emoji.error} Make sure mention next time`).setColor("##ff4242"))
}let trustedusers = await db.get(`trustedusers_${message.guild.id}`)
if(trustedusers && trustedusers.find(find => find.user == user.id)) {
return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`) .setDescription(`${emoji.error} This User It's Already on whitelist`).setColor(colors.uptime))
}
let data = {
user: user.id
}
await  db.push(`trustedusers_${message.guild.id}`, data)
let added = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setColor(colors.uptime)
.setDescription(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`) .setDescription(`${user} has been added in whiteList succesfully ${emoji.sucess}`).setColor(colors.uptime))
return message.channel.send(added);
}
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`) .setDescription(`${emoji.error}
 Only \`ownership\` of the server can use that command.`).setColor(colors.uptime))
}}