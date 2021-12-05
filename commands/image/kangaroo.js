const Discord = require('discord.js');
const fetch = require('node-fetch');
const emoji = require('../../emoji.json')

module.exports = {
 name: "kangaroo",
 aliases: [],
 description: "Sends a random Kangaroo photo",
 category: "Image",
 usage: "Kangaroo",
 run: async (client, message, args) => {
  (async () => {
   try {
    const res = await fetch('https://some-random-api.ml/img/kangaroo');
    const img = (await res.json()).link;
    
    const embed = new Discord.MessageEmbed() // Prettier()
     .setTitle(
      "🦘 Kangaroo 🦘",
      message.guild.iconURL({
       dynamic: true,
       format: "png",
      })
     )
     .setImage(body.url)
     .setColor("RANDOM")
     .setFooter(
      "Requested by " + `${message.author.username}` + " • (Cuteee)",
      message.author.displayAvatarURL({
       dynamic: true,
       format: "png",
       size: 2048,
      })
     )
     .setTimestamp()
     .setURL(body.url);
    message.lineReply(embed);
   } catch (err) {
    message.lineReply({
     embed: {
      color: 16734039,
      description: "Something went wrong... :cry:",
     },
    });
   }
  })();
 },
};