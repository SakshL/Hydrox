const { Util } = require("discord.js")
const emoji = require('../../emoji.json')

  module.exports = {
    name: "addemoji",
    category: "moderation",
    description: "Steal emojis from other server",
    usage: "addemoji <emoji> <name>",
    aliases: ["steal"],
    run: async(client, message, args) => {
        const emoji = args[0];
       if (!emoji) return message.channel.send("Please provide emoji to add\n\n**Usage:** `addemoji <emoji> <name>`");

      let custom = Util.parseEmoji(emoji);

		const name = args[1] ? args[1].replace(/[^a-z0-9]/gi, "") : null;
		if (!name) {
			return message.reply(`${emoji.error} Please provide a name to set`);
		}
		if (name.length < 2 || name > 32) {
			return message.reply("Emoji name length should be between 2 and 32");
		}     
   const URL = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`;
   try{
     message.guild.emojis
			.create(URL, name)
			.then(emoji => {
				message.reply(`Emoji ${emoji} was successfully added`, {
					emojiName: emoji.name
				})
			})
    } catch(err) {
      return message.channel.send(`can\' add that emoji`);
    }
     }
  }