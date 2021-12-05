const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const emoji = require('../../emoji.json')

module.exports = {
  name: "coinflip",
  aliases: ["toss", "flip"],
  description: "Flip A Coin!",
  usage: "Coinflip",
  run: async (client, message, args) => {
    //Start
    message.delete();
    const coins = ["Heads", "Tails", "Center"];

    let result = Math.floor(Math.random() * coins.length);

    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle(`Coin Is`)
      .setDescription(coins[result])
      .setFooter(`Fliped by ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed);

    //End
  }
};