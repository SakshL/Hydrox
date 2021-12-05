const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord-buttons')
module.exports = {
  name: "invite",
  category: "🔰 Info",
  aliases: ["add"],
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    let ls = client.settings.get(message.guild.id, "language")
    try {
      let button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.com/invite/FQGXbypRf8")
      let button_invite = new MessageButton().setStyle('url').setLabel('Invite Me').setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
      //array of all buttons
      const allbuttons = [button_invite, button_support_dc]
      message.channel.send({
        embed: new MessageEmbed()
          .setColor(ee.color)
          .setTitle(":heart: Thanks for inviting me!")
          .setDescription(`[*Invite* **${client.user.username}**](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`)
          .addField(`<:Milrato:840259659163893820> Bot Powered by Milrato.eu`, `**[Invite Best Bot](https://clan.milrato.eu)  •  [WEBSITE](https://milrato.eu)  •  [Support Server/Get your Own Bot](https://discord.com/invite/FQGXbypRf8)**`)
          .setFooter("Music Mixer | powered by milrato.eu", client.user.displayAvatarURL()),
        buttons: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/FQGXbypRf8
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */
