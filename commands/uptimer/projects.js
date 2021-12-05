const UrlsConfig = require("./../../database/models/UrlsConfig");
const discord = require("discord.js");
const { default_prefix } = require("./../../config.json");
const emoji = require('../../emoji.json')

module.exports = {
  name: "projects",
  description: "*Shows All Of Your Projects*",
  category: "uptime",
  aliases: [],
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    const filter = {
      authorID: message.author.id,
    };
    let content = [];
    const all = await UrlsConfig.find(filter);
    console.log(all.length)
    var menuEmoji = "<a:playing:849582405178490880>";
    var embed = new discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`${menuEmoji} Your Projects [${all.length}]`)
      .setTimestamp();
    var count = 0;
    all.forEach(async (data) => {
      count++;
      content.push(`**${count}**. \`${data.projectURL}\``);
    });
    if (content.length === 0) {
      embed.setDescription(
        `*<a:Deny:862764513194803301> You Don't Have Any Projects Added!*\nAdd One By Using In Server: \`${default_prefix}add [Project Url]\``
      );
    } else {
      embed.setDescription(content.join("\n"));
    }
    var errors = false;
    await message.author.send(embed).catch((err) => {
      errors = true;
      if (err.message === "<:error:872104702626639922> Cannot Send Messages To This User") {
        return message.lineReply(
          `<:error:872104702626639922> \`Cannot Send Message To You. Please Turn On Your Dms\`.`
        );
      }
    });
    if (!errors) {
      message.lineReply("📥 Check Your DM.");
    }
  },
};
