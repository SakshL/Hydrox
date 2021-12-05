const { Client, Message, MessageEmbed, Discord, } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons')
const emoji = require('../../emoji.json')

const fetch = require("node-fetch");
const config = require('../../config.json')
module.exports = {
    name: 'google',
    aliases: ['gl'], 
    description: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
   const search = message.content.split(" ").slice(1).join(" ")
    if(!args)return message.channel.send("Specify Text To Search")
    const web = new MessageButton()
      .setStyle('url')
      .setLabel("search Link")
      .setURL(`https://www.google.com/search?q=${args}`)
     .setEmoji("850032198379896894")

   const xd = new MessageEmbed()
   .setAuthor(message.author.tag, message.author.avatarURL())
.setDescription(`[${args}](https://www.google.com/search?q=${search})`)
.setFooter(client.user.username, client.user.avatarURL())
message.channel.send(xd, web)
    
    }
}

