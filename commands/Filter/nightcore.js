const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require('../../emoji.json')
module.exports = {
  name: `nightcore`,
  category: `👀 Filter`,
  aliases: [``],
  description: `Applies a Nightcore Filter`,
  usage: `nightcore`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      player.node.send({
        op: "filters",
        guildId: message.guild.id,
        equalizer: player.bands.map((gain, index) => {
            var Obj = {
              "band": 0,
              "gain": 0,
            };
            Obj.band = Number(index);
            Obj.gain = Number(gain)
            return Obj;
          }),
        timescale: {
              "speed": 1.165,
              "pitch": 1.125,
              "rate": 1.05
          },
      });
      player.set("filter", "👻 Nightcore");
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        
        .setTitle(`${emoji.msg.SUCCESS} Applying the \`NIGHTCORE\` Filter`)
        .setDescription(`Note: *It might take up to 5 seconds until you hear the Filter*`)
      );
    } catch (e) {
      console.log(e)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        
        .setTitle(`${emoji.error} An error occurred`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
  }
};
