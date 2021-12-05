const db = require("old-wio.db");
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const emoji = require('../../emoji.json')

module.exports = {
  name: "howgay",
  aliases: [""],
  category: "fun",
  description: "Shows How Member Gay Is!",
  usage: "howgay <Mention Member>",
  run: async (bot, message, args) => {
    //Start

    let Member =
      message.mentions.users.first() ||
      message.guild.member(args[0]) ||
      message.author;

    let Result = Math.floor(Math.random() * 101);

    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`About your Gayness`)
      .setDescription(`${Member.username} Is ${Result}% Gay 🏳️‍🌈`)
      .setFooter(`Requested By ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};
 
