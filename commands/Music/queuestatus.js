const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require('../../emoji.json')
const playermanager = require(`../../musichandlers/playermanager`);
const {
  createBar
} = require(`../../musichandlers/functions`);
module.exports = {
  name: `queuestatus`,
  category: `🎶 Music`,
  aliases: [`qs`, `queueinfo`, `status`, `queuestat`, `queuestats`, `qus`],
  description: `Shows the current Queuestatus`,
  usage: `queuestatus`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      client.settings.ensure(message.guild.id, {
        playmsg: true
      });
      //toggle autoplay
      let embed = new MessageEmbed()
        embed.setTitle(`Queue Information of **${message.guild.name}**`)
        embed.setDescription(`**Connected to:** <#${player.voiceChannel}> **And bound to:** <#${player.textChannel}>`)
        embed.addField(`${emoji.msg.raise_volume} Volume`, `\`\`\`${player.volume}%\`\`\``, true)
        embed.addField(`${emoji.msg.repeat_mode} Queue Length: `, `\`\`\`${player.queue.length} Songs\`\`\``, true)
        embed.addField(`📨 Pruning: `, `\`\`\`${client.settings.get(message.guild.id, "playmsg") ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}\`\`\``, true)
        
        embed.addField(`${emoji.msg.autoplay_mode} Song Loop: `, `\`\`\`${player.trackRepeat ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}\`\`\``, true)
        embed.addField(`${emoji.msg.autoplay_mode} Queue Loop: `, `\`\`\`${player.queueRepeat ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}\`\`\``, true)
        embed.addField(`${emoji.msg.autoplay_mode} Autoplay`, `\`\`\`${player.get(`autoplay`) ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}\`\`\``, true)
        
        embed.addField(`${emoji.msg.equalizer} Equalizer: `, `\`\`\`${player.get("eq")}\`\`\``, true)
        embed.addField(`🎛 Filter: `, `\`\`\`${player.get("filter")}\`\`\``, true)
        embed.addField(`:clock1: AFK Mode`, `\`\`\`PLAYER: ${player.get("afk") ? `${emoji.msg.SUCCESS} Enabled` : `${emoji.msg.ERROR} Disabled`}\`\`\``, true)
        
        embed.setColor(ee.color)

        embed.addField(`${emoji.msg.disk} Current Track: `, `${player.queue && player.queue.current ? `${player.playing ? `${emoji.msg.resume}` : `${emoji.msg.pause}`} [**${player.queue.current.title}**](${player.queue.current.uri})` : `\`\`\`${emoji.msg.ERROR} Nothing Playing\`\`\``}`)
        if(player.queue && player.queue.current){
          embed.addField(`${emoji.msg.time} Progress: `, player.queue && player.queue.current ? createBar(player) : `\`\`\`${emoji.msg.ERROR} Nothing Playing\`\`\``)
        }
      message.channel.send(embed);
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        
        .setTitle(`${emoji.msg.ERROR} An error occurred`)
        .setDescription(`${e.message}`)
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
