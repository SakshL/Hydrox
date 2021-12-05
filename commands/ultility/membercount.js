const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const emoji = require('../../emoji.json')
module.exports = {
  name: "membercount",
  description: "*membercount",
  category: "uptime",
  aliases: ["mc"],
  ownerOnly: false,
  run: async(client, message, args) =>{
var u = new MessageButton()
    .setLabel(`Members : ${message.guild.memberCount}`)
  .setID('button_1')
  .setStyle('blurple');
  
    const mc = new MessageEmbed()
    .setColor('GREEN')
    .setTitle('Members')
    .setDescription(`> ${message.guild.memberCount}`)
    .setTimestamp();
    message.channel.send(mc , u)
  }
}

