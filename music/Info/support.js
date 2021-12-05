const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord-buttons')
module.exports = {
  name: "support",
  category: "🔰 Info",
  usage: "invite",
  description: "Sends you the Support Server Link",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    let ls = client.settings.get(message.guild.id, "language")
    try {
       let button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.gg/FQGXbypRf8")
      let button_invite = new MessageButton().setStyle('url').setLabel('Invite Me').setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
      //array of all buttons
      const allbuttons = [button_support_dc, button_invite]
      message.channel.send({
        embed: new MessageEmbed()
          .setColor(ee.color)
          .setTitle(":tickets: You need help? **JOIN MY SUPPORT SERVER**")
          .setDescription(`**[Invite Best Bot](https://discord.com/api/oauth2/authorize?client_id=784364932149280778&permissions=8&scope=bot)  •  [WEBSITE](https://milrato.eu)  •  [Support Server/Get your Own Bot](https://discord.gg/FQGXbypRf8)**`)
          .setFooter("Music Mixer | powered by milrato.eu", client.user.displayAvatarURL())
          .setURL("https://discord.gg/FQGXbypRf8"),
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
