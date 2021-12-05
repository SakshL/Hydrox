const { Discord, MessageEmbed } = require("discord.js")
const disbut = require("discord-buttons")
const emoji = require('../../emoji.json')

module.exports = {
  name: "fight",
  aliases: [],
  usage: "",
  description: "",
  run: async (bot, message, args) => {
    if (!args[0]) {
      let embed = new MessageEmbed()
        .setFooter("Thanks For Using me")
        .setTitle("<:no:880293644408594443> Error <:no:880293644408594443>")
        .setDescription("Please ping a person You want to Fight!")
        .setColor("FF0000")
      message.channel.send(embed)
    } else {
      let embed1 = new MessageEmbed()
        .setFooter("Thanks For Using me")
        .setTitle("<a:yes:880128360456531998> Success <a:yes:880128360456531998>")
        .setDescription(`This fight with ${args[0]} has begun!`)
        .setColor("00FF00")
      let kick = new disbut.MessageButton()
        .setLabel("Kick")
        .setStyle("blurple")
        .setID("kick")
        .setEmoji("🦵")
      let punch = new disbut.MessageButton()
        .setLabel("Punch")
        .setStyle("green")
        .setID("punch")
        .setEmoji("🤜")
      let block = new disbut.MessageButton()
        .setLabel("Block")
        .setStyle("red")
        .setID("block")
        .setEmoji("🛡️")
      let row1 = new disbut.MessageActionRow()
      .addComponent(punch)
      .addComponent(block)
      .addComponent(kick)
      
      message.channel.send(embed1, row1)
    }

  }
}