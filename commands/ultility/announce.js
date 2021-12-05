const Discord = require("discord.js");
const emoji = require('../../emoji.json')


module.exports = {
  name: "announce",
  aliases: ["aa"],
  category: "Info",
  description: "Annoeunce Your Message To Anothr Channel",
  usage: "announce #channel your message",
  run: async(client, message, args) => {
    if (!message.member.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send("You don't have premmsions to do that!");

    let inline = true;
    let sayChannel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!sayChannel)
      return message.channel.send(
        `<:Cross:778450163014303774> | ${message.author} mention a channel First`
      );
    let sayMsg = args
      .slice(1)
      .join(" ")
      .split(" | ");

    if (!sayMsg[1]) sayMsg[1] == "FF7034";
    if (!sayMsg)
      return message.channel.send(
        ` | Say Some Message To Announce`
      );
    let role = message.member.highestRole;
    let embed = new Discord.MessageEmbed()
      .setColor(sayMsg[1])
      .setDescription(sayMsg[0]);

    message.delete();
    message.channel
      .send(
        `<:yesk:778449313616756736>  | successfully Announced Your Message To ${sayChannel}`
      )
      .then(m => m.delete({ timeout: 2000 }));

    sayChannel.send({ embed }).catch(console.error);
  }
};