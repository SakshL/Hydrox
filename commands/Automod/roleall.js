const db = require("quick.db");
const Discord = require("discord.js")
const colors = require('./../../colors.json')
const emoji = require('../../emoji.json')

module.exports = {
  name: "role-all",
  aliases: ["ra", "all-role"],
  run: async (client, message, args) => {
     if (!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("fuckyou")
    
    var role1 = message.mentions.roles.first().id;
    if(!role1)
    {
      var role1 = args[0];
    }

    let role2 = message.guild.roles.cache.get(`${role1}`);
message.guild.members.cache.forEach(member => member.roles.add(role2))
message.reply(new Discord.MessageEmbed()
 .setTittle("${emoji.sucess} Successfully")
 .setDescription("Done. It Will Be Running In Background")
 .setFooter("Thanks For Using Me!")
 .setColor("RANDOM")
 .setTimestamp()
 );
  }
}