const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'invites',
    aliases: [''], 
    description: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      let invuser = message.mentions.members.first() || message.author;
      let userinvites = message.guild.fetchInvites();
      let userinvsize = userinvites.filter(u => u.inviter && inviter.id === user.id)

      if(userinv.size <=0) {
        return message.channel.send(`${message.author} You Don't Have Invites!!!`)
      }

      let i = 0;
      userinv.forEach(inv => i += inv.uses)
      const allinv = new MessageEmbed()
      .setAuthor(`${invuser} Invites`)
      .addField('Invites', i)
      .setTimestamp()
      message.channel.send(allinv)
    }
} 