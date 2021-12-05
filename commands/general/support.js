const Discord = require("discord.js")
const { MessageEmbed } = require("discord.js")
const config = require("../../config");
const { MessageButton } = require("discord-buttons")
const emoji = require('../../emoji.json')

module.exports = {
  name: "support",
  description: "*Join our Support Server For Help!*",
  category: "uptime",
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message) => {
   const { MessageEmbed } = require("discord.js");
   const { default_prefix } = require("./../../config.json");

    let button_public_invite = new MessageButton().setStyle('url').setLabel('Invite Public Bot').setURL("https://discord.com/api/oauth2/authorize?client_id=882311254423765012&permissions=8&scope=bot")
      let button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.gg/r7ZRYnYK2g")
      let button_invite = new MessageButton().setStyle('url').setLabel('Invite This Bot').setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
      //array of all buttons
      const allbuttons = [button_public_invite, button_support_dc, button_invite]

    let mybuttonsmsg = await message.channel.send({
        embed: new MessageEmbed()
          .setColor("RANDOM")
          .setTitle("<a:jumpheart:862765468052881409> You Need Help? **JOIN OUR SUPPORT SERVER**")
          .setDescription(`**[Invite Uptimer](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)  •  [Support Server](https://discord.gg/r7ZRYnYK2g)**`)
          .setFooter("Hydorx", "https://media.discordapp.net/attachments/882623206853337158/882673120929005578/discord-avatar-512-T4KXQ-removebg-preview.png?width=469&height=469")
          .setURL("https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot"),
        buttons: allbuttons
      });
  }
}
