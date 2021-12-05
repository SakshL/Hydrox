const { DiscordTogether } = require('discord-together');
const MessageEmbed = require("discord.js")
const Discord = require("discord.js")
const emoji = require('../../emoji.json')

module.exports = {
  name: "chess-together",
  aliases: ["chess"],
  usage: "",
  description: "",
  run: async (client, message, args) => {
    if (message.member.voice.channel) {
      client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'chess').then(async invite => {
        return message.channel.send(`${invite.code}`);
      });
    } else {
      let embed = new Discord.MessageEmbed()
        .setFooter("Bot Developer: akg#9426 | Prefix : p!")
        .setTitle("${emoji.error} Error ${emoji.error}")
        .setDescription("You are Not In a Voice Channel!\n Please Join a Voice Channel!")
        .setColor("#FF0000")
      message.channel.send(embed)
    }

  }
}