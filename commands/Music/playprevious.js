const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require('../../emoji.json')
const playermanager = require(`../../musichandlers/playermanager`);
module.exports = {
  name: `playprevious`,
  category: `🎶 Music`,
  aliases: [`pp`, `ppre`, `playprevius`, `playprevios`],
  description: `Plays the Previous played Song and skips the current Song`,
  usage: `playprevious`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": true},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //define the type
      let type = `skiptrack:youtube`;
      //if the previous was from soundcloud, then use type soundcloud
      if (player.queue.previous.uri.includes(`soundcloud`)) type = `skiptrack:soundcloud`
      //plays it
      if(type != "skiptrack:soundcloud") message.react("840260133686870036")
      else message.react("840260133686870036")
      playermanager(client, message, Array(player.queue.previous.uri), type);
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        
        .setTitle(`<:no:833101993668771842> An error occurred`)
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
