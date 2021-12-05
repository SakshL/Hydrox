const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require('../../emoji.json')
const playermanager = require(`../../musichandlers/playermanager`);
module.exports = {
  name: `autoplay`,
  category: `🎶 Music`,
  aliases: [`ap`, `toggleauto`, `toggleautoplay`, `toggleap`],
  description: `Toggles Autoplay on/off`,
  usage: `autoplay`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      //toggle autoplay
      player.set(`autoplay`, !player.get(`autoplay`))
      //Send Success Message
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`**Successfully __${player.get(`autoplay`) ? "Enabled" : "Disabled"}__ AUTOPLAY MODE**`)
        .setDescription(`**I will now${player.get(`autoplay`) ? "" : " not"} automatically add a Song when the Queue get's Empty (overwrites afk-Mode)!**`)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        
        .setTitle(`<:no:833101993668771842> An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
