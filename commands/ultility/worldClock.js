 const Discord = require('discord.js');
 const { MessageEmbed } = require('discord.js');
 const emoji = require('../../emoji.json')
 
 module.exports = {
   name: "worldclock",
   description: "worldclock",
   category: 'utility',
   aliases: ["wclock"],
   
   async run (client, message, args) {
     
     
var gmt = new Date().toLocaleString("en-US", { timeZone: "Europe/London" })
          var est = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
          var pst = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
          var cst = new Date().toLocaleString("en-US", { timeZone: "America/Mexico_City" })
          var mst = new Date().toLocaleString("en-US", { timeZone: "America/Phoenix" })
          var aest = new Date().toLocaleString("en-US", { timeZone: "Australia/Sydney" })
          var awst = new Date().toLocaleString("en-US", { timeZone: "Australia/Perth" })
          var kst = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
          var ist = new Date().toLocaleString("en-US", { timeZone: "Asia/Calcutta" })
          const worldClock = new Discord.MessageEmbed()
            .setAuthor('World Clock - Timezones')
            .addField(':flag_eu: London (GMT)', `${gmt}\n(GMT+0/GMT+1)`, true)
            .addField('\u200B', '\u200B', true)
            .addField(':flag_us: New York (EST)', `${est}\n(GMT-5)`, true)
            .addField(':flag_us: Los Angles (PST)', `${pst}\n(GMT-8)`, true)
            .addField(':flag_us: Mexico City (CST)', `${cst}\n(GMT-7)`, true)
            .addField(':flag_au: Sydney (AEST)', `${aest}\n(GMT+11)`, true)
            .addField(':flag_au: Perth (AWST)', `${awst}\n(GMT+8)`, true)
            .addField('\u200B', '\u200B', true)
            .addField(':flag_kr: Korean (KST)', `${kst}\n(GMT+9)`, true)
            .addField(':flag_in: India (IST)', `${ist}\n(GMT+05:30)`, true)
            .addField('\u200B', '\u200B', true)
            .setColor('BLUE')
          message.channel.send(worldClock)

     
     
   }
 }