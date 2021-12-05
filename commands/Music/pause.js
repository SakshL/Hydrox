const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require('../../emoji.json')
const {
  createBar,
  format
} = require(`../../musichandlers/functions`);
module.exports = {
  name: `pause`,
  category: `🎶 Music`,
  aliases: [`break`],
  description: `Pauses the Current Song`,
  usage: `pause`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //if the player is paused return error
      if (!player.playing)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`<:no:833101993668771842> The song is already paused!`)
          .setDescription(`You can resume it with: \`${prefix}resume\``)
        );
      //pause the player
      player.pause(true);
      //return success message
      message.react(emoji.react.SUCCESS)
      message.react("⏸️")
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
