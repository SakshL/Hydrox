const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require('../../emoji.json')
module.exports = {
  name: `removetrack`,
  category: `🎶 Music`,
  aliases: [`rt`, `remove`],
  description: `Removes a track from the Queue`,
  usage: `removetrack <Trackindex>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try{
      //if no args return error
      if (!args[0])
        return message.channel.send(new MessageEmbed()
          
          .setColor(ee.wrongcolor)
          .setTitle(`<:no:833101993668771842> Please add the Track you want to remove!`)
          .setDescription(`Example: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        );
      //if the Number is not a valid Number return error
      if (isNaN(args[0]))
        return message.channel.send(new MessageEmbed()
          
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} It has to be a valid Queue Number!`)
          .setDescription(`Example: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        );
      //if the Number is too big return error
      if (Number(args[0]) > player.queue.size)
        return message.channel.send(new MessageEmbed()
          
          .setColor(ee.wrongcolor)
          .setTitle(`${emoji.msg.ERROR} Your Song must be in the Queue!`)
          .setDescription(`Example: \`removetrack ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        );
      //remove the Song from the QUEUE
      player.queue.remove(Number(args[0]) - 1);
      //Send Success Message
      return message.channel.send(new MessageEmbed()
        .setTitle(`${emoji.msg.cleared} I removed the track at position: \`${Number(args[0])}\``)
        .setColor(ee.color)
        
      );
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
