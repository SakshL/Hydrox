const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'commandscount',
    aliases: ['commands','cc'],
    ownerOnly: false,

    run: async (client, message, args) => {
    var u = new MessageButton()
    .setLabel(`My commands : ${message.client.commands.size}`)
  .setID('button_1')
  .setStyle('blurple');
const embed = new MessageEmbed()
      .setTitle(`${client.user.username} My Commands count`)
      .addField('Commands', `\`${message.client.commands.size}\` commands`, true)
     .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          message.author.displayAvatarURL({ dynamic: true })
          message.channel.send(embed , u)
      
    }
}
