const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
  duration
} = require("../../handlers/functions")
module.exports = {
  name: "uptime",
  category: "🔰 Info",
  aliases: [""],
  cooldown: 10,
  usage: "uptime",
  description: "Returns the duration on how long the Bot is online",
  run: async (client, message, args, user, text, prefix) => {
    try {
      let date = new Date()
      let timestamp = date.getTime() - Math.floor(client.uptime);
      message.channel.send(new MessageEmbed()
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`:white_check_mark: **${client.user.username}** Uptime`)
        .setDescription(`\`\`\`css\n${duration(client.uptime).map(i=> `${i}`).join(", ")}\`\`\``)
        .addField("**Date Launched**",  moment(timestamp).format("LLLL"))
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
