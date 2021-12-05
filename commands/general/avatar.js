const Discord = require('discord.js')
const emoji = require('../../emoji.json')
var { MessageButton , MessageActionRow } = require(`discord-buttons`)
var db = require(`quick.db`)
module.exports = {
  name : "avatar",
  aliases: ["av", "ava", "av"],
   run: async(client, message, args) => {

 
  var user = message.mentions.users.first()|| client.users.cache.get(message.content.split(' ')[1]) || message.author;

var embed = new Discord.MessageEmbed()
.setTitle("Avatar:comet:. . ⋆")
    .setAuthor(user.username , user.avatarURL())
    .setImage(user.avatarURL({dynamic : true, size : 1024}))
    .setTitle(message.guild.name, message.guild.iconURL)


var u = new MessageButton()
.setStyle(`url`)
.setLabel(`Download Avatar`)
.setURL(`${user.displayAvatarURL({
 size: 2048,
 dynamic: true,
})}`)
var row = new MessageActionRow()
.addComponent([u])
message.channel.send({components: [row], embed: embed})

   }
}