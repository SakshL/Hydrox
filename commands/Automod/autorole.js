const db = require("quick.db");
const Discord = require("discord.js")
const colors = require('./../../colors.json')
const emoji = require('../../emoji.json')

module.exports = {
  name: "autorole",
  aliases: ["ar", "auto-role"],
  run: async (client, message, args) => {
     if (message.member.hasPermission("MANAGE_SERVER")) {
      if (message.content.includes("@everyone")) {
        return message.reply("Everyone is already automatically given by discord");
      }
    
if(!args[0])
{
  return message.reply(new Discord.MessageEmbed()
  .setThumbnail(message.guild.iconURL({ dynamic: true }) || null)
  .setTitle("${emoji.error} Error Occured!")
  .setDescription("Hey You Didnt Gave Me Role To Add When A Member Joins The Server")
  .setFooter("Thanks For Using Me!")
  .setColor("RANDOM")
  .setTimestamp()
  );
}
  var role1 = message.mentions.roles.first().id;
    if(!role1)
    {
      var role1 = args[0];
    }
if(args[0] == "disable" || args[0] == "off")
{
 
  db.delete(`autorole_${message.guild.id}`);
  return message.reply("Done i have Disabled auto role in your server enable it by adding any role");
}
else {
message.reply(`Ok Now i will give this role when someone joins this server role - ${role1}`)
db.set(`autorole_${message.guild.id}`, role1);
}
     }
  }
}
