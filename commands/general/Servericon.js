const { Client, MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'servericon',
    aliases: ['si'], 
    description: 'Show Server Avatar',
    run: async(client, message, args) => {
      const embed = new MessageEmbed()
      .setTitle(`${message.guild.name}'s Icon`)
      .setImage(message.guild.iconURL({ dynamic: true }))
      .setFooter(`By - ${message.author.username}`)
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
      const icon = new MessageButton()
      .setStyle(`url`)
      .setLabel(`Download Avatar`)
      .setURL(`${message.guild.iconURL({
        size: 2048,
        dynamic: true,
      })}`)
    message.channel.send(embed, icon);
    }
}