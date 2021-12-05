const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require('../../emoji.json')
const { autoplay, } = require("../../handlers/functions");
const { MessageButton, MessageActionRow } = require('discord-buttons')
module.exports = {
    name: "skip",
    category: "🎶 Music",
    aliases: ["fs", "forceskip", "voteskip", "s", "vs"],
    description: "Forces to skip the current song",
    usage: "skip",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
      //get the channel instance from the Member
      const { channel } = message.member.voice;
      //if the member is not in a channel, return
      if (!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle("❌ You need to join a voice channel.")
        );
      //get the player instance
      const player = client.manager.players.get(message.guild.id);
      //if no player available return aka not playing anything
      if (!player){
        if(message.guild.me.voice.channel) {
          message.guild.me.voice.channel.leave().catch(e => console.log(e))
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
      //if not in the same channel as the player, return Error
      if (channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle("❌ You need to be in my voice channel to use this command!")
          .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );
      //if ther is nothing more to skip then stop music and leave the Channel
      if (player.queue.size == 0) {
        //if its on autoplay mode, then do autoplay before leaving...
        if(player.get("autoplay")) return autoplay(client, player, "skip");
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
        }
        return
      }
      //skip the track
      player.stop();
      //send success message
      return message.react("⏭").catch((e) => {})
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
						
            .setTitle(`❌ An error occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``)
        );
    }
  }
};
