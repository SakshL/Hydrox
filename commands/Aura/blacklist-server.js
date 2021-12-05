const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
const colors = require('./../../colors.json')
const language = "en";
const { default_prefix } = require("./../../config.json");
const emoji = require('../../emoji.json')

//ban
module.exports = {
    name: "ban",
    description: "ban members from server",
    run: async (client, message) => {
      if(message.author.bot || !message.guild) return;
var args = message.content.toLowerCase().split(" ");
var cmd = args[0];
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    if(args[1] == `add`){
        if(!args[2] || isNaN(args[2]) || args[2].length != 18) return message.channel.send(`> ${cmd} ${args[1]} [server id]`);
        var black = db.fetch(`black_${args[2]}`);
        if(black){
          let embed = new MessageEmbed()
          .setDescription("This server is already blacklisted")
          .setColor(colors.uptime)
          return message.channel.send(embed);
        }else{
          let embed124 = new MessageEmbed()
          .setDescription(`__${args[2]}__ , added to blacklist.`)
          .setColor(colors.uptime)
           db.set(`black_${args[2]}`,"black")
           message.channel.send(embed124)
        }
    }else if(args[1] == `remove`){
        if(!args[2] || isNaN(args[2]) || args[2].length != 18) return message.channel.send(`> ${cmd} ${args[1]} [server id]`);
        var black = db.fetch(`black_${args[2]}`);
        if(black){
          let embed1 = new MessageEmbed()
          .setDescription(`__${args[2]}__ , removed from black list.`)
          .setColor(colors.uptime)
          message.channel.send(embed1);
        db.delete(`black_${args[2]}`);
        }else{
          let embed15 = new MessageEmbed()
          .setDescription("This server is not blacklisted")
          .setColor(colors.uptime)
            message.channel.send(embed15);
        }
    }else{
      let embed = new MessageEmbed()
      .setDescription(`**${cmd} add [server id]** (add server to black list)\n**${cmd} remove [server id]** (remove server from balck list)`)
      .setColor(colors.uptime)
        message.channel.send(embed);
}
}
}

