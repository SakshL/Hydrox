const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require('../../emoji.json')
module.exports = {
  name: `equalizer`,
  category: `👀 Filter`,
  aliases: [`eq`, "eqs", "seteq", "setequalizer"],
  description: `Changes the Equalizer`,
  usage: `bassboost <music/bassboost/earrape>`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    try {
      let level = `none`;
      if (!args.length || (!client.eqs[args[0].toLowerCase()] && args[0].toLowerCase() != `none`))
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(`<:no:880293644408594443> Equalizer level must be one of the following`)
          .setDescription(`Valid Equalizers:\n\`music\`, \`pop\`, \`electronic\`, \`classical\`, \`rock\`, \`full\`, \`light\`, \`gaming\`, \`bassboost\`, \`earrape\`\n\nUsage: \`${prefix}equalizer <Equalizer>\`\n\nExample: \`${prefix}equalizer music\``)
        );
      level = args[0].toLowerCase();
      switch (level) {
        case `music`:
          player.set("eq", "🎵 Music");
          player.setEQ(client.eqs.music);
          break;
        case `pop`:
          player.set("eq", "🎙 Pop");
          player.setEQ(client.eqs.pop);
          break;
        case `electronic`:
        case `electro`:
        case `techno`:
          player.set("eq", "💾 Electronic");
          player.setEQ(client.eqs.electronic);
          break;
        case `classical`:
        case `classic`:
        case `acustics`:
          player.set("eq", "📜 Classical");
          player.setEQ(client.eqs.classical);
          break;
        case `rock`:
        case `metal`:
          player.set("eq", "🎚 Metal");
          player.setEQ(client.eqs.rock);
          break;
        case `full`:
        case `ful`:
          player.set("eq", "📀 Full");
          player.setEQ(client.eqs.full);
          break;
        case `light`:
          player.set("eq", "💿 Light");
          player.setEQ(client.eqs.light);
          break;
        case `gaming`:
        case `game`:
        case `gam`:
          player.set("eq", "🕹 Gaming");
          player.setEQ(client.eqs.gaming);
          break;
        case `music`:
          player.set("eq", "🎵 Music");
          player.setEQ(client.eqs.music);
          break;
        case `bassboost`:
          player.set("eq", "🎛 Bassboost");
          player.setEQ(client.eqs.bassboost);
          break;
        case `earrape`:
          player.set("eq", "🔈 Earrape");
          player.setVolume(player.volume + 50);
          player.setEQ(client.eqs.earrape);
          break;
      }
      return message.channel.send(new MessageEmbed()
        .setColor(ee.color)
        
        .setTitle(`${emoji.msg.SUCCESS} Set Equalizer to \`${level}\``)
        .setDescription(`Note: *It might take up to 5 seconds until you hear the new Equalizer*`)
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
