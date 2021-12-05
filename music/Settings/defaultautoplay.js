const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "defaultautoplay",
  category: "⚙️ Settings",
  aliases: ["default-autoplay", "defaultap", "default-ap"],
  cooldown: 10,
  usage: "defaultautoplay",
  description: "Toggles if it Autoplay should be enabled on default or not! [Default: true]",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, user, text, prefix) => {
    try {
      client.settings.ensure(message.guild.id, {
        defaultap: true,
      });
      
      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "defaultap"), "defaultap");
      
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`**Successfully __${client.settings.get(message.guild.id, "defaultap") ? "Enabled" : "Disabled"}__ the Default Autoplay = ON**`)
        .setDescription(`**I will now${client.settings.get(message.guild.id, "defaultap") ? "" : " not"} use Autoplay = ON on 1. Track start!**`)
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
