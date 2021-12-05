const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db')
const emoji = require('../../emoji.json')
const Schema = require('../../models/welcome')
module.exports = {
    name: 'setwelcome',
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
      const welcomechannel = message.mentions.channels.first();
      const errore = new MessageEmbed()
      .setDescription(`Usages \`${prefix}setwelcome <#channel>\``)
      .setFooter('Thanks for using me!')
      .setColor("GREEN")
      if(!welcomechannel) return message.channel.send(errore)
      
      Schema.findOne({ Guild: message.guild.id}, async (err, data) =>{
        if(data){
          data.channel = welcomechannel.id
          data.save();
        } else {
          new Schema({
            Guild: message.guild.id,
            Channel: welcomechannel.id
          }).save();
        }
        const sucess = new MessageEmbed()
        .setDescription(`<#${welcomechannel.id}> has been set as welcomechannel!`)
        .setColor("GREEN")
        .setFooter('Thanks for using me')
        message.channel.send(sucess)
      })
    }
}