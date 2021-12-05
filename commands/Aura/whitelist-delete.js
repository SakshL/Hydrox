const Discord = require("discord.js")
const db = require("quick.db")
const colors = require('./../../colors.json')
const emoji = require('../../emoji.json')

module.exports = {
name: "whitelist-delete",
run: async (client, message, args) => {
if(message.author.id === message.guild.ownerID) {
let user = message.mentions.users.first()
if(!user) {return message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`${emoji.error} Make sure mention next time`).setColor("##ff4242"))}
const guildicon = message.guild.iconURL();
let database = await db.get(`trustedusers_${message.guild.id}`)
if(database) {
let data = database.find(x => x.user === user.id)
let unabletofind = new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setColor(colors.uptime)

.setTitle("Error")
.setDescription(`${emoji.error} I cant find that user on database. `)
 if(!data) return message.channel.send(unabletofind)
let value = database.indexOf(data)
delete database[value]
var filter = database.filter(x => {return x != null && x != ''})
await db.set(`trustedusers_${message.guild.id}`, filter)
let deleted = new Discord.MessageEmbed()
.setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
.setDescription(`${user} has been removed from whitelist users ${emoji.sucess}`)
.setColor(colors.uptime)
return message.channel.send(deleted)
} else {          
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`${emoji.error} that user not on whitelist users list`) .setColor(colors.uptime))
}}
message.channel.send(new Discord.MessageEmbed().setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`${emoji.error} Only \`ownership\` of the guild can use that cmd!`) .setColor(colors.uptime))}}
 
/**
 * @INFO
 * Bot Coded by RogmitOp#6051 |
 * https://www.youtube.com/channel/UCPJRB-I9FCkWzgN3c2vKIpQ
 * @INFO
 * Please mention Him , when using this Code!
 * @INFO
 */