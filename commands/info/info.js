const { MessageEmbed } = require("discord.js");
const { dependencies } = require("../../package.json");
const moment = require("moment");
const os = require("os");
const emoji = require('../../emoji.json')
const osutils = require("os-utils");
require("moment-duration-format");

module.exports = {
  name: "info",
  description: "*Shows Info About Uptimer*",
  category: "uptime",
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("***Hydrox Stats***")
      .setDescription("** General Information**")
      .addField("<:owner:862764025561481246> Developers", " <@745581095747059722> **,** <@729554449844011130> **,** <@440200028292907048> , <@506505845215985674> , <@831196752798547978>")
      .addField("<:role:862763054373797954> Guilds Count", "```" + client.guilds.cache.size + "```", true)
      .addField("<:members:862763256643977237> Members Count", "```" + client.guilds.cache.reduce((a, g) => a + g.memberCount, 0) + "```", true)
      .addField("<:channel:862762962669535283> Channels Count", "```" + client.channels.cache.size + "```", true)
      .addField("⏳ Uptime", `\`${duration}\``, true)
      .addField("🏓 Ping", "`" + Math.round(client.ws.ping) + "ms`", true)
      .addField("<:discduckmicroshit:862764988942385183>  Platform", "`" + capitalize(osutils.platform()) + "`", true)
      .addField("<:discordjs:862762698613719071> Discord.js", "`" + dependencies["discord.js"].replace("^", "v") + "`", true)
      .addField("<:node:862764665000165406> Node", "`" + process.version + "`", true)
      .addField("<:cpu:862763665814847509> CPU", "```Intel(R) Xeon(R)```")
      .addField("<:ram:862763796127678475> Total Memory", "```" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1] + "MB```")
      .addField("<:ram:862763796127678475> RAM Usage (VPS)", `\`\`\`${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split("")[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1]}MB (${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split("")[1]}%)\`\`\``)
      .addField("<:ram:862763796127678475> RAM Usage (BOT)", "```" + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split("")[0] + osutils.totalmem().toString().split(".")[1].split("")[1] + "MB " + `(${((100 * (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)) / osutils.totalmem().toString().split(".")[0]).toFixed(2)}%)` + "```")
      .addField("🔗 Useful Links", `[Support Server](https://discord.gg/sakshyam) | [Invite Me](https://discord.com/oauth2/authorize/?permissions=8&scope=bot&client_id=${client.user.id})`)
      .setFooter('Thanks For Using Me!')
    // I copied this from my bot XDDDD Lol
    message.channel.send(embed);
  }
}
