const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require('../../emoji.json')
const {
  format,
  arrayMove
} = require(`../../musichandlers/functions`);
module.exports = {
  name: `moveme`,
  category: `🎶 Music`,
  aliases: [`mm`, "mvm", "my", "mvy", "moveyou"],
  description: `Moves you to the BOT, if playing something`,
  usage: `move`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false, "notsamechannel": true},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      let channel = message.member.voice.channel;
      let botchannel = message.guild.me.voice.channel;
      if(!botchannel) 
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`<:no:833101993668771842> I am connected nowhere`)
        );
      if(!channel) 
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Please Connect first`)
        );
      if(botchannel.userLimit >= botchannel.members.length) 
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} The Channel is full, I cant move you`)
        );
        if(botchannel.id == channel.id) 
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} You are already in my channel `)
        );
      message.member.voice.setChannel(botchannel);
      message.react("👌");
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        
        .setTitle(`${emoji.msg.ERROR} An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
};
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */
