const db = require("old-wio.db");

const { MessageEmbed } = require("discord.js");
const emoji = require('../../emoji.json')
const Discord = require("discord.js");

var pattern = new RegExp(
  "^(https?:\\/\\/)?" +
  "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
  "((\\d{1,3}\\.){3}\\d{1,3}))" +
  "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
  "(\\?[;&a-z\\d%_.~+=-]*)?" +
  "(\\#[-a-z\\d_]*)?$",
  "i"
);

module.exports = {
  name: "embedsay",
  aliases: ["esay"],
  description: "Says your input via the bot in embed",
  category: "fun",
  usage: "say <input>",
  run: async (bot, message, args) => {
    //Start

    message.delete();

    let Content = args.join(" ");

    if (!Content)
      return message.channel.send(`Please Give Me Something To Say!`);

    function UrlCheck(str) {
      return pattern.test(str);
    }

    if (UrlCheck(Content) === true) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(
          `Links Is Not Allowed | Only Administrators Can Use Links!`
        );
      }
    }

    let embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`${Content}`)
      .setTimestamp();

    return message.channel.send(embed);

    //End
  }
};
