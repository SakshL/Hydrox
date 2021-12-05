const Discord = require('discord.js');
const fetch = require('node-fetch');
const emoji = require('../../emoji.json')

module.exports = {
    name: "cat",
    aliases: ["kitten", "kitty", "pussy"],
    category: "images",
    description: "Sends a random cat image !!",
    usage: `*cat`,
    run: async (bot, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/cat');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle(`🐈 Meow !!! 🐈`)
    .setImage(img)
    .setFooter("Thanks For Using Me")
    .setColor("cccfff");
    message.channel.send(embed);
  }
}