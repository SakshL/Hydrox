const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require('../../emoji.json')
module.exports = {
  name: `pitch`,
  category: `👀 Filter`,
  aliases: [``],
  description: `Allows you to change the PITCH of the TRACK`,
  usage: `pitch <Multiplicator>   |   Multiplicator could be: 0  -  3`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      if (!args.length)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          
          .setTitle(`${emoji.error} Please include the Multiplicator`)
          .setDescription(`Usage: \`${prefix}pitch <Multiplicator>\`\n\nExample: \`${prefix}pitch 1.2\``)
        );
      if(isNaN(args[0]))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          
          .setTitle(`${emoji.msg.ERROR} The Multiplicator must be a Number`)
          .setDescription(`Usage: \`${prefix}pitch <Multiplicator>\`\n\nExample: \`${prefix}pitch 1.2\``)
        );
      if(Number(args[0]) >= 3 || Number(args[0]) <= 0)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          
          .setTitle(`${emoji.msg.ERROR} Multiplicator out of range | Must be between 0 and 3`)
          .setDescription(`Usage: \`${prefix}pitch <Multiplicator>\`\n\nExample: \`${prefix}pitch 1.2\``)
        );
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
                "speed": 1.0,
                "pitch": Number(args[0]),
                "rate": 1.0
            },
        });
        player.set("filter", "📈 Pitch");
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        
        .setTitle(`${emoji.msg.SUCCESS} Pitch set to \`${args[0]}\``)
        .setDescription(`Note: *It might take up to 5 seconds until you hear the Filter*`)
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