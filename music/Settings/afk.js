const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "afk",
  category: "⚙️ Settings",
  aliases: ["awayfromkeyboard", "24/7"],
  cooldown: 10,
  usage: "afk",
  description: "Toggles if the Current Queue should be stated on 'afk' or not [DEFAULT: false]",
  memberpermissions: ["ADMINISTRATOR"],
  parameters: {"type":"music", "activeplayer": true, },
  run: async (client, message, args, user, text, prefix, player) => {
    try {
      await player.set(`afk`, !player.get(`afk`))
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`**Successfully __${player.get(`afk`) ? "Enabled" : "Disabled"}__ AFK MODE**`)
        .setDescription(`**I will now${player.get(`afk`) ? "" : " not"} stay afk in the Channel when there is nothing to play!**`)
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
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
