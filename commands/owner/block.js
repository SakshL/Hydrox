const { Client, Message, MessageEmbed } = require('discord.js');
const db = require('quick.db');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'block',
    aliases: [''], 
    description: 'block user from the bot!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      if(message.author.id == "745581095747059722" || message.author.id == "729554449844011130" || message.author.id == "440200028292907048") {
      if(!args[0]) return message.channel.send( new MessageEmbed()
      .setTitle("<:no:880293644408594443> Error")
      .setDescription("Please Provide A User ID!")
      .setFooter("Thanks For Using Me!")
      .setColor("RED")
      .setTimestamp()
      );
     /* if(!args[0] === "745581095747059722" || "729554449844011130" ||"440200028292907048") return message.channel.send(new MessageEmbed()
      .setTitle("<:no:880293644408594443> Error")
      .setDescription('You Can\'t Block Bot Owner')
      .setFooter("Thanks For Using Me")
      .setColor("RED")
      .setTimestamp()
       );*/ //waitumm //i will add later for now this ohk 
      const noid = new MessageEmbed()
      .setTitle("<:no:880293644408594443> Error")
      .setDescription("Invalid User ID Provided!")
      .setFooter("Thanks For Using Me!")
      .setColor("RANDOM")
      .setTimestamp();
      if(isNaN(args[0])) return message.channel.send(noid)// waitok
      const alreadyblocked = db.fetch(`blocked_users_${args[0]}`, "blocked"); 
      if(alreadyblocked !== null) {
      return message.channel.send(new MessageEmbed()
      .setTitle("<:no:880293644408594443> Error")
      .setDescription("This User Is Already Blocked!")
      .setFooter("Thanks For Using Me")
      .setColor("RED")
      .setTimestamp()
      )
      }
      console.log(args[0])
 db.set(`blocked_users_${args[0]}`, "blocked");
return message.channel.send( new MessageEmbed()
      .setTitle("<a:yes:847689262827569183> Successfully Blocked ")
      .setDescription("User Blocked <:no:880293644408594443> ! Now The User Can't Use My Commands!")
      .setFooter("Thanks For Using Me!")
      .setColor("RANDOM")
      .setTimestamp()
);
      } else {
        const embed1 = new MessageEmbed()
        .setTitle("<:no:880293644408594443> Error")
        .setDescription("You Don't Have Permission To Use This Command.")
        .setFooter("Thanks For Using Me!")
        .setColor("RANDOM")
        .setTimestamp()
        message.channel.send(embed1);
      }
    }
}
