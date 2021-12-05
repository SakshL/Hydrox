const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require('../../emoji.json');const {
  format,
  delay,
  arrayMove
} = require("../../handlers/functions")
const { MessageButton, MessageActionRow } = require('discord-buttons')
module.exports = {
  name: `stop`,
  category: `🎶 Music`,
  aliases: [`leave`, "dis", "disconnect", "votestop", "voteleave", "votedis", "votedisconnect", "vstop", "vleave", "vdis", "vdisconnect"],
  description: `Stops current track and leaves the channel`,
  usage: `stop`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //if there is no current track error
      if (!player){
        if(message.guild.me.voice.channel) {
          message.guild.me.voice.channel.leave()
            return message.channel.send(new MessageEmbed()
              .setTitle(`${emoji.msg.stop} Stopped and left your Channel`)
              .setColor(ee.color)
              
            );
        }
        else {
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setTitle(`<:no:833101993668771842> No song is currently playing in this guild.`)
          );
        }
        return
      }
      
      if (player.queue && !player.queue.current) {
        if(message.guild.me.voice.channel) {
          try{
            client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
              msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
              ]}).catch((e)=>{console.log(e)})
            }).catch((e)=>{console.log(e)})
          }catch{ }
          try{
            message.guild.me.voice.channel.leave();
          }catch{ }
          try{
            player.destroy();
          }catch{ }
          return message.react(emoji.react.stop).catch((e)=>{})
        }
        else {
          return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setTitle(`${emoji.msg.ERROR} No song is currently playing in this guild.`)
          );
        }
        return
      }
      try{
        client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
          msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
            new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
            new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
            new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
          ]}).catch((e)=>{console.log(e)})
        }).catch((e)=>{console.log(e)})
      }catch{ }
      //stop playing
      try{
        player.destroy();
      }catch{ }
      //React with the emoji
      return message.react(emoji.react.stop).catch((e)=>{})
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
