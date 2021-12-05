const { Client, Message, MessageEmbed } = require('discord.js');
const btn = require('discord-buttons')
const db = require('quick.db')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'setupticket',
    aliases: [''], 
    description: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      try {
      if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You can\t do it!')
      const channel = message.mentions.channels.first()
      if(!channel) return message.reply('mention channel')
      const suprole = message.mentions.roles.first()
      if(!suprole) return message.channel.send('Support role is require')
      const tickete = new MessageEmbed()
      .setTitle(message.guild.name + ' Ticket!')
      .setDescription('**[<:click_to_create_ticket:883383208169848872>] Click to open ticket**')
      .setFooter('Thanks For Using Me')
      .setColor('GREEN')
      .setThumbnail(message.guild.iconURL({dynamic: true}))
      const ticketbtn = new btn.MessageButton()
      .setLabel('Create Ticket')
      .setEmoji('883383208169848872')
      .setStyle('green')
      .setID('ticket_create_12676515')
      const success = new MessageEmbed()
       .setTitle("Success!")
       .setDescription(`[<:click_to_create_ticket:883383208169848872>] The ticket was configured. To see it go to ${channel}`)
       .setColor("GREEN")
      const delet = new btn.MessageButton()
      .setLabel('Delete')
      .setStyle('red')
      .setID('ticket_delete_1341411')
      channel.send(tickete, ticketbtn);
      message.channel.send(success);
      } catch(err) {
        console.log(err);
        return message.channel.send("Something went wrong!")
      }
    }
} 