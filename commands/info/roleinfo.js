const Discord = require("discord.js")
const db = require('quick.db')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'roleinfo',
    aliases: ['rl'], 
    description: 'gives you the role info',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      
      var r = message.mentions.roles.first()
      if (!r) return message.channel.send('**Mentions a Role First**')

      var embed = new Discord.MessageEmbed()
      .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
    .setTitle(`${r.name} info`)
    .setColor(r.hexColor)
    .addField('<a:Developer:847688151904157716> Server name : ' + message.guild.name,true)
    .addField('<:discordbughunterlv1:862766069370585118> Role : ' + r.name,true)
    .addField('<a:sinPlay:847688541022584862> Role ID : ' + r.id,true)
    .addField('<a:efs1:862768037315608636> Role Created At :' + r.createdAt,true)
    .addField('<:julia:865223957305098261> Role color :' + r.hexColor,true)
    .addField('<a:attn:847688322549678090> Role Members :' + r.members,true)
    .addField('Permissions : '+ `${r.permissions.toArray().map(p=>`\`${p}\``).join(", ")}`)
    .setFooter('Made By Uptimer Team')
    message.channel.send(embed)

    }
} 