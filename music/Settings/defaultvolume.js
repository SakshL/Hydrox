const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
module.exports = {
  name: "defaultvolume",
  category: "⚙️ Settings",
  aliases: ["default-volume", "defaultvol", "default-vol"],
  cooldown: 10,
  usage: "defaultvolume <Volume>",
  description: "Defines the Default Volume on 1. Track start [Default: 15]",
  memberpermissions: ["ADMINISTRATOR"],
  run: async (client, message, args, user, text, prefix) => {
    try {
      client.settings.ensure(message.guild.id, {
        defaultvolume: 15
      });
      if(!args[0]){
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`<:no:833101993668771842> You did not add a new Default Volume`)
          .setDescription(`**The Current Default Volume is: \`${client.settings.get(message.guild.id, "defaultvolume")}%\`**`)
        );
      }
      let volume = args[0];
      if(isNaN(volume)){
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`<:no:833101993668771842> You did not add a valid new Default Volume`)
          .setDescription(`*It must be a **Number***\n**The Current Default Volume is: \`${client.settings.get(message.guild.id, "defaultvolume")}%\`**`)
        );
      }
      if(Number(volume) > 150 || Number(volume) < 1){
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`<:no:833101993668771842> You did not add a valid new Default Volume`)
          .setDescription(`*It must be between \`150\` and \`1\`*\n**The Current Default Volume is: \`${client.settings.get(message.guild.id, "defaultvolume")}%\`**`)
        );
      }
      client.settings.set(message.guild.id, Number(volume), "defaultvolume");
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`**Successfully set the new Default Volume to: \`${client.settings.get(message.guild.id, "defaultvolume")}%\`**`)
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
