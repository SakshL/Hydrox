const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require('../../emoji.json')
const playermanager = require(`../../musichandlers/playermanager`);
module.exports = {
  name: `join`,
  category: `🎶 Music`,
  aliases: [`summon`, `create`],
  description: `Summons the Bot in your Channel`,
  usage: `join`,
  parameters: {"type":"radio", "activeplayer": false, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, curplayer) => {
    try{
      var { channel } = message.member.voice;
      if(!channel) 
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`<:no:833101993668771842> You are not connected to a Voice Channel`)
        );
      //if no args return error
      var player = client.manager.players.get(message.guild.id);
      if(player) {
        var vc = player.voiceChannel;
        var voiceChannel = message.guild.channels.cache.get(player.voiceChannel);
        
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} I am already connected somewhere`)
          .setDescription(`I am connected in: \`${vc ? voiceChannel ? voiceChannel.name : vc : "could not get voicechanneldata"}\``)
        );
      }
      //create the player
      player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: config.settings.selfDeaf,
      });
      //join the chanel
      if (player.state !== "CONNECTED") { 
        player.connect();
        message.react("🎙").catch(e => console.log("Couldn't delete message this is a catch to prevent a crash".grey));
        player.stop();
      }
      else {
        var vc = player.voiceChannel;
        var voiceChannel = message.guild.channels.cache.get(player.voiceChannel);
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} I am already connected somewhere`)
          .setDescription(`I am connected in: \`${vc ? voiceChannel ? voiceChannel.name : vc : "could not get voicechanneldata"}\``)
        );
      }
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
