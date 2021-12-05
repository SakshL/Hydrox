const Discord = require("discord.js");
const ownerid = ["745581095747059722"];
const ownerid2 = ["729554449844011130"];
const emoji = require('../../emoji.json')

module.exports = {
    name: "leaveserver",
    aliases: [""],
    category: "owner",
    description: "Displays the list of servers the bot is in!",
    usage: " ",
    accessableby: "Owner",
  run: async (client, message, args) => {
    if (message.author.id == ownerid || ownerid2) {
		
		    const guildId = args[0];
 
    if (!guildId) {
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle("<:no:880293644408594443> Error Occured!")
      .setDescription(`Please Provide A Valid Server ID`)
      .setFooter("Thanks For Using Me")
      .setColor("RANDOM")
      .setTimestamp()
      );
    }
 
    const guild = client.guilds.cache.find((g) => g.id === guildId);
 
    if (!guild) {
      message.react("<:no:880293644408594443>")
      return message.channel.send(new Discord.MessageEmbed()
      .setTitle("<:no:880293644408594443> Error Occured!")
      .setDescription(`I Am Not In Server`)
      .setFooter("Thanks For Using Me")
      .setColor("RANDOM")
      .setTimestamp()
      );
    }
 
    try {
      await guild.leave();
      message.react("<:leaves:882472979466977380>")
      return message.channel.send(new Discord.MessageEmbed()
      .setThumbnail(guild.iconURL({ dynamic: true }) || null)
      .setTitle("<a:r_dot:882480749524185108> Successfully ")
      .setDescription(`<a:yes:847689262827569183> Successfully Left Guild - **${guild.name}**`)
      .setFooter("Thanks For Using Me")
      .setColor("RANDOM")
      .setTimestamp()
      );
    } catch (e) {
      console.error(e);
      return message.channel.send("An error occurred leaving that guild");
    }
    }
    }
  }