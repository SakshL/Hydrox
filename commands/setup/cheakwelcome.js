const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db')
const emoji = require('../../emoji.json')
const Schema = require('../../models/welcome')
module.exports = {
    name: 'cheakwelcome',
    aliases: [''], 
    description: 'set the welcome channel',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      const prefix = db.get(`guild_${message.guild.id}_prefix`) || ","
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You can\t do it!')
      
      Schema.findOne({ Guild: message.guild.id}, async (err, data) =>{
        if(!data) return message.reply('There are no welcome channel')
        const channel = client.channels.cache.get(data.Channel)
        message.reply(`Welcome Channel : <#${channel}>`)
      })
    }
}