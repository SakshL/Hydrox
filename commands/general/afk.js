const { MessageEmbed } = require('discord.js');
const db = require('../../models/afk');
const emoji = require('../../emoji.json')

module.exports = {
  name: 'afk',
  run: async(client, message, args) => {
    const afkreason = args.slice(0).join(' ') || 'No reason';
    db.findOne({ Guild: message.guild.id, Member: message.author.id }, async(err, data) => {
      if(data) {
        return;
      } else {
        Data = new db({
          Guild: message.guild.id,
          Member: message.author.id,
          Content: afkreason,
          TimeAgo: Date.now()
        })
        Data.save()
        const afksave = new MessageEmbed()
        .setTitle(`${message.author.tag} Is now afk`)
        .setDescription(afkreason)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        try{
          message.member.setNickname(`[AFK] ${message.author.username}`)
        } catch (err) {
          return;
        }
        
        message.channel.send(afksave)
      }
    })
  }
}

