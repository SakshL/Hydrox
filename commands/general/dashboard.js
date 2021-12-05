const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'dashboard',
    aliases: ['website'], 
    description: 'go to dashboard',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      const embed = new MessageEmbed()
      .setDescription("Hydroxbot team are working on it!\n[Preview](https://hydroxbot.xyz)")
      .setFooter("Soon!")
      .setColor("GREEN")
      message.lineReply(embed)
    }
} 