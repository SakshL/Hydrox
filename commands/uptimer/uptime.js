const { Client, Message, MessageEmbed } = require("discord.js");
const emoji = require('../../emoji.json')

module.exports = {
  name: "uptime",
  description: "Gives you bot's uptime",
  aliases: ["up"],
  usage: ``,
  run: async (client, message, args) => {
    const days = Math.floor(client.uptime / 86400000);
    const hours = Math.floor(client.uptime / 3600000) % 24; // 1 Day = 24 Hours
    const minutes = Math.floor(client.uptime / 60000) % 60; // 1 Hour = 60 Minutes
    const seconds = Math.floor(client.uptime / 1000) % 60; // 1 Minute = 60 Seconds

    message.lineReply(
      new MessageEmbed()
        .setDescription(
          `**Uptime**: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
        )
        .setColor("#303136")
    );
  },
};
