const Discord = module.require("discord.js");
const emoji = require('../../emoji.json')

module.exports = {
   name: "unlock",
   description: "Unlocks a Channel",
    usage: "unlock <channel>",
  args: true,
  category: "moderation",
    permissions: "MANAGE_CHANNELS",
   run: async(client, message, args) => {
   if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("You don't have enough Permissions")
   }
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        null : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle(`${emoji.sucess} Channel Unlock`)
   .setDescription(`${emoji.sucess} ${message.channel}  has been Unlocked`)
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
}
}