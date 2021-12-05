const { Client, Message, MessageEmbed } = require('discord.js');
const akinator = require('discord.js-akinator')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'akinator',
    aliases: ['aki'],
  category: "fun", 
   description: 'Akinator game but on discord',
    usage: 'akinator <option>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        akinator(message, client)
    }
}
