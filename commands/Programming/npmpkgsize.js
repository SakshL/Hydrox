//Here the command starts
const db = require('quick.db')
const config = require("../../botconfig/config.json")
var ee = require("../../botconfig/embed.json")
const emoji = require('../../emoji.json')
const fetch = require("node-fetch");
const { STATUS_CODES } = require("http");
const { MessageEmbed } = require(`discord.js`);
module.exports = {
	//definition
	name: "npmpkgsize", //the name of the command 
	category: "⌨️ Programming", //the category this will be listed at, for the help cmd
	aliases: ["npmpackagesize", "nodepackagemanagersize"], //every parameter can be an alias
	cooldown: 4, //this will set it to a 4 second cooldown
	usage: "npmpkgsize <package>", //this is for the help command for EACH cmd
  	description: "Search the NPM Registry for a package Size Information", //the description of the command

	//running the command with the parameters: client, message, args, user, text, prefix
  	run: async (client, message, args, user, text, prefix) => {
		let es = client.settings.get(message.guild.id, "embed")
		try {
      const ps = db.get(`guild_${message.guild.id}_prefix`) || ","
			const name = args[0];
			if (!name)
				return message.channel.send({embed: new MessageEmbed()
					.setColor(es.wrongcolor)
					.setFooter(es.footertext, es.footericon)
					.setTitle(`<a:no:865963806483808256> You didn't provide a NPM-PACKAGE`)
					.setDescription(`Usage: \`${prefix}npm <package>\``)
				});
			const { publishSize, installSize } = await fetch(`https://packagephobia.now.sh/api.json?p=${encodeURIComponent(name)}`)
				.then(res => res.json());
			  
			  if (!publishSize && !installSize) return message.channel.send("That package doesn't exist.");

			function getBytes(bytes) {
			const i = Math.floor(Math.log(bytes) / Math.log(1024));
			return (!bytes && "0 Bytes") || `${(bytes / Math.pow(1024, i)).toFixed(2)} ${suffixes[i]}`;
			}
			
			return message.channel.send({ embed: new MessageEmbed()
				.setTitle(`NPM Package Size - ${name}`)
				.setColor(es.color)
				.setFooter(es.footertext, es.footericon)
				.setDescription(`**Publish Size:** ${getBytes(publishSize)}\n**Install Size:** ${getBytes(installSize)}`) });
		} catch (e) {
			console.log(String(e.stack).bgRed)
			return message.channel.send(new MessageEmbed()
			  .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
			  .setTitle(`<a:no:865963806483808256> An error occurred`)
			  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
			);
		  }
	
	}
}
//-CODED-BY-TOMATO#6966-//