const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
module.exports = {
  name: "auditlog",
  aliases: ['logs'],
  usage: "*auditlog",
  description: "Shows Audit log",
  run: async (client, message, args) => {
    const { guild } = message 
    //console.log(guild)
    const audit = guild.fetchAuditLogs() 
    console.log(audit)
    //console.log(name, region, memberCount, icon, owner, afkTimeout)
    message.channel.send(`${audit}`)
  },
};
