const math = require('math-expression-evaluator');
const ms = require("ms");
const moment = require("moment")

const {
  MessageEmbed,
  MessageAttachment
} = require("discord.js");
const db = require("quick.db");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
  module.exports = {
  name: "remind",
  description: "remind command",
  category: "school",
  run: async (client, message, args) => {
    const prefix = db.get(`guild_${message.guild.id}_prefix`) || ',';
    if(!args[0])
    return message.channel.send(new MessageEmbed()
      .setColor("RANDOM")
      .setFooter("Thanks For Using Me")
      .setTitle(`<:no:880293644408594443> Please Add a TIME!`)
      .setDescription(` Usage: \`${prefix}remind <Time+Format(e.g: 10m)> ++ TEXT\`\n\nExample: \`${prefix}remind 10m 32s ++ Remind me!!\``)
    );
    let newargs = args.join(" ").split("++")
    let time = 0;
      try {
        const timeargs = newargs[0].trim().split(" ")
        console.log(timeargs)
        for(const t of timeargs)
          time += ms(t);
        console.log(time)
      } catch (e) {
        return message.channel.send(new MessageEmbed()
          .setColor("RANDOM")
          .setFooter("Thanks For Using Me!")
          .setTitle(`<:no:880293644408594443> please add a valid TIME!`)
          .setDescription(` Usage: \`${prefix}remind <Time+Format(e.g: 10m)> ++ TEXT\`\n\nExample: \`${prefix}remind 10m 32s ++ Remind me!!\``)
        );
      }
    let content = newargs.slice(1).join(" ");
    if (!content) return message.reply("No content added")
    // Based off the delimiter, sets the time
    let returntime = time;
    if (returntime > 2073600000) return message.channel.send(new MessageEmbed()
      .setColor("RANDOM")
      .setFooter("Thanks For Using Me")
      .setTitle(`<:no:880293644408594443> The time limit is 24 Days!`)
      .setDescription(` Usage: \`${prefix}remind <Time+Format(e.g: 10m)> ++ TEXT\`\n\nExample: \`${prefix}remind 10m 32s ++ Remind me!!\``)
    );
    if (returntime == 0) return message.channel.send(new MessageEmbed()
      .setColor("RANDOM")
      .setFooter("Thanks For Using Me")
      .setTitle(`<:no:880293644408594443> please add a TIME!`)
      .setDescription(` Usage: \`${prefix}remind <Time+Format(e.g: 10m)> ++ TEXT\`\n\nExample: \`${prefix}remind 10m 32s ++ Remind me!!\``)
    );
    const now = new Date();
    let string_of_time = "";
    if(returntime >= 1000 * 60 * 60 * 24) string_of_time = `\`${moment(returntime).format("DD")} Days\`, \`${moment(returntime).format("HH")} Hours\`, \`${moment(returntime).format("mm")} Minutes\`, \`${moment(returntime).format("ss")} Seconds\``
    else string_of_time = `\`${moment(returntime).format("HH")} Hours\`, \`${moment(returntime).format("mm")} Minutes\`, \`${moment(returntime).format("ss")} Seconds\` `
    message.reply(new MessageEmbed()
      .setColor("RANDOM")
      .setFooter("Thanks For Using Me")
      .setTitle(`${emoji.msg.SUCCESS} I will remind you in:\n${string_of_time}`)
      .setDescription(`Message will come to your DMS!`)
    );
    
    let olddate = Date();
    client.setTimeout(function () {
      message.author.send(new MessageEmbed()
        .setColor("RANDOM")
        .setFooter("Thanks For Using Me")
        .setTitle(`${emoji.msg.SUCCESS} I reminded you after:\n${string_of_time}`)
        .addField(`Created in **(${message.guild.name})**`, `<#${message.channel.id}> `)
        .addField("Created at:", `\`${olddate}\``)
        .setDescription(content)
      );
    }, returntime)
  }

};
