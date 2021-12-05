const Discord = require("discord.js");
const Random = require("srod-v2");
const emoji = require('../../emoji.json')

module.exports = {
 name: "glass",
 aliases: [],
 description: "Returns a glass image",
 category: "Image",
 usage: "glass [user mention, user id, user name]",
 run: async (client, message, args) => {
  try {
   const amember = (await message.mentions.members.first()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((r) => r.user.username.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.guild.members.cache.find((r) => r.displayName.toLowerCase().includes() === args.join(" ").toLocaleLowerCase()) || message.member;
   const wait = new Discord.MessageEmbed()
   .setDescription("✨ | Please wait... I'm generating your image");
   message.channel.send(wait).then((m) =>
     m.delete({
      timeout: 300,
     })
    );
   const embed = await Random.Glass({
    Image: amember.user.displayAvatarURL({
     format: "png",
    }),
    Color: "RANDOM",
   });
   return message.channel.send(embed);
   message.delete(wait);
  } catch (err) {
   message.lineReply({
    embed: {
     color: 16734039,
     description: "Something went wrong... :cry:",
    },
   });
  }
 },
};