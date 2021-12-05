 const id = ["697517724649390151"]// الاي دي حقك
const { MessageEmbed } = require("discord.js");
const colors = require('./../../colors.json')
const Discord = require("discord.js")
const db = require("quick.db")
const language = "en";
const { default_prefix } = require("./../../config.json");
//ban
module.exports = {
    name: "blacklist-user",
    description: "ban members from server",
    run: async (client, message) => {
      if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
if(!id.includes(message.author.id)) return message.channel.send("You cant bro")
  let user_black = message.mentions.users.first()
  if(!user_black) return message.channel.send("Make mention next time")
    let on_or_off = await db.get(`blacklist_${user_black.id}`);
  message.channel.send(new Discord.MessageEmbed().setDescription(`${user_black} has been \`${on_or_off ? "Unblacklisted" : "Blacklisted"}\``).setColor(colors.uptime));
 await db.set(`blacklist_${user_black.id}`, on_or_off ? false : true);

}
    }
