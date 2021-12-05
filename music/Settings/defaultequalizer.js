const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "defaultequalizer",
  category: "⚙️ Settings",
  aliases: ["default-equalizer", "defaulteq", "default-eq"],
  cooldown: 10,
  usage: "equalizer",
  description: "Toggles if it should use the Default Equalizer on 1. Track start or not! [Default: false]",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, user, text, prefix) => {
    try {
      client.settings.ensure(message.guild.id, {
        defaulteq: false,
      });
      
      client.settings.set(message.guild.id, !client.settings.get(message.guild.id, "defaulteq"), "defaulteq");
      
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`**Successfully __${client.settings.get(message.guild.id, "defaulteq") ? "Enabled" : "Disabled"}__ the Default Equalizer (Music)**`)
        .setDescription(`**I will now${client.settings.get(message.guild.id, "defaulteq") ? "" : " not"} use the Default Equalizer "Music" on 1. Track start!**`)
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
