const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const NSFW = require('discord-nsfw')
const emoji = require('../../emoji.json')
const nsfw = new NSFW();
module.exports = {
    name: "gonewild",
    description: " nsfw cmd!",
    category: "nsfw",

    async run (client, message, args) {

if(message.channel.nsfw) {

const image = await nsfw.gonewild();
const embed = new Discord.MessageEmbed()
    .setTitle(`Gonewild Image`)
    .setColor("BLACK")
    .setImage(image);
message.channel.send(embed).then(msg=> { msg.react(`${emoji.nsfw}`) }).catch();

} else {
      message.react(`${emoji.error}`)
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle(`${emoji.error} NSFW Not Allowed Here!`)
      .setDescription(`Use **NSFW** Commands In A **NSFW** Marked Channel ( Look In Channel Settings, Dummy )`)
      .setImage("https://i.imgur.com/oe4iK5i.gif")
      .setFooter("Thanks For Using Me")
      .setColor("RANDOM")
      .setTimestamp()
      );
  }
    }
}