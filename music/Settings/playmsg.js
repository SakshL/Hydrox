const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "playmsg",
  category: "⚙️ Settings",
  aliases: ["toggleplaymsg", "toggle-playmsg", "pruning", "toggle-pruning"],
  cooldown: 10,
  usage: "playmsg",
  description: "Toggles if it should sends a Message with Buttons when a Song Starts! [Default: true]",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, user, text, prefix) => {
    try {
      client.settings.ensure(message.guild.id, {
        playmsg: true
      });
      
      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "playmsg"), "playmsg");
      
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`**Successfully __${client.settings.get(message.guild.id, "playmsg") ? "Enabled" : "Disabled"}__ the Play Message Sending**`)
        .setDescription(`**I will now${client.settings.get(message.guild.id, "playmsg") ? "" : " not"} send Messages with Buttons when a Song starts**`)
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
