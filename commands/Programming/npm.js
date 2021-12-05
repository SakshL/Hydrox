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
	name: "npm", //the name of the command 
	category: "⌨️ Programming", //the category this will be listed at, for the help cmd
	aliases: ["npmpackage", "npmpkg", "nodepackagemanager"], //every parameter can be an alias
	cooldown: 4, //this will set it to a 4 second cooldown
	usage: "npm <package>", //this is for the help command for EACH cmd
  	description: "Search the NPM Registry for a package information", //the description of the command

	//running the command with the parameters: client, message, args, user, text, prefix
  	run: async (client, message, args, user, text, prefix) => {
		try {
			const pkg = args[0];
      const ps = db.get(`guild_${message.guild.id}_prefix`) || ","
			if (!pkg)
				return message.channel.send({embed: new MessageEmbed()
					.setColor("RANDOM") 
					.setFooter("Thanks For Using Me")
					.setTitle(`<a:no:865963806483808256> You didn't provide a NPM-PACKAGE`)
					.setDescription(`Usage: \`${ps}npm <package>\` `)
				});

			const body = await fetch(`https://registry.npmjs.com/${pkg}`)
				.then((res) => {
				if(res.status === 404) throw "No results found.";
				return res.json();
				});
		
			const version = body.versions[body["dist-tags"].latest];
		
			let deps = version.dependencies ? Object.keys(version.dependencies) : null;
			let maintainers = body.maintainers.map((user) => user.name);
		
			if(maintainers.length > 10) {
				const len = maintainers.length - 10;
				maintainers = maintainers.slice(0, 10);
				maintainers.push(`...${len} more.`);
			}
		
			if(deps && deps.length > 10) {
				const len = deps.length - 10;
				deps = deps.slice(0, 10);
				deps.push(`...${len} more.`);
			}
		
			return message.channel.send({ embed: new MessageEmbed()
				.setTitle(`NPM - ${pkg}`)
				.setColor("GEEEN")
				.setFooter("Thanks for using me")
				.setURL(`https://npmjs.com/package/${pkg}`)
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
				.setDescription([
				body.description || "No Description.",
				`**Version:** ${body["dist-tags"].latest}`,
				`**License:** ${body.license}`,
				`**Author:** ${body.author ? body.author.name : "Unknown"}`,
				`**Modified:** ${new Date(body.time.modified).toDateString()}`,
				`**Dependencies:** ${deps && deps.length ? deps.join(", ") : "None"}`
				].join("\n")) });
		} catch (e) {
			console.log(e)
			return message.channel.send(new MessageEmbed()
			  .setTitle(`<a:no:865963806483808256> An error occurred`)
			  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
			);
		  }
	
	}
}
