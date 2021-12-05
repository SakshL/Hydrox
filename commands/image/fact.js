const { MessageEmbed } = require('discord.js');
const Random = require("srod-v2");
const emoji = require('../../emoji.json')
const disbut = require("discord-buttons")
let commenthelp = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('Help Menu')
  .setEmoji("874458757130780723")
  .setID("commenthelp");
module.exports = {
    name: 'fact',
    category: 'fun',
    description: 'Shows some cool fact',
    usage: 'fact',
    aliases: [''],
    run: async(bot, message, args) => {
       let data = await Random.GetFact();
       message.channel.send(data);
    }
};