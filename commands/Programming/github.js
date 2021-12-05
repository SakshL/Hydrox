//Here the command starts
const db = require('quick.db')
const config = require("../../botconfig/config.json")
var ee = require("../../botconfig/embed.json")
const emoji = require('../../emoji.json')
const fetch = require("node-fetch");
const { MessageEmbed } = require(`discord.js`);
module.exports = {
	//definition
	name: "github", //the name of the command 
	category: "⌨️ Programming", //the category this will be listed at, for the help cmd
	aliases: ["git", "repo", "repository", "githubrepo"], //every parameter can be an alias
	cooldown: 4, //this will set it to a 4 second cooldown
	usage: "github <REPO-LINK>", //this is for the help command for EACH cmd
  	description: "View a GitHub Repository details.", //the description of the command

	//running the command with the parameters: client, message, args, user, text, prefix
  	run: async (client, message, args, user, text, prefix) => {
 		const ps = db.get(`guild_${message.guild.id}_prefix`) || ","     

		let es = client.settings.get(message.guild.id, "embed")
		try {
    const ps = db.get(`guild_${message.guild.id}_prefix`) || ","
			const repo = args[0];
			if (!repo)
				return message.channel.send({embed: new MessageEmbed()
					.setColor(es.wrongcolor)
					.setFooter(es.footertext, es.footericon)
					.setTitle(`<a:no:865963806483808256> You didn't provide a Repository`)
					.setDescription(`Usage: \`${prefix}github <REPO-LINK>\``)
				});
			const [username, repository] = repo.split("/");
			if (!username || !repository) 
				return message.channel.send({embed: new MessageEmbed()
					.setColor(es.wrongcolor)
					.setFooter(es.footertext, es.footericon)
					.setTitle(`<a:no:865963806483808256> Repository must be in the form \`username/repository\``)
					.setDescription(`Usage: \`${prefix}github <REPO-LINK>\`\nExample: \`${prefix}github https://github.com/Tomato6966/Codes/\``)
				});

			const body = await fetch(`https://api.github.com/repos/${username}/${repository}`)
			.then((res) => res.ok && res.json())
			.catch(() => null);

			if (!body) 
				return message.channel.send({embed: new MessageEmbed()
					.setColor(es.wrongcolor)
					.setFooter(es.footertext, es.footericon)
					.setTitle(`<a:no:865963806483808256> Could not fetch that repo`)
					.setDescription("Are you sure it exists?")
				});
			const size = body.size <= 1024 ? `${body.size} KB` : Math.floor(body.size / 1024) > 1024 ? `${(body.size / 1024 / 1024).toFixed(2)} GB` : `${(body.size / 1024).toFixed(2)} MB`;
			const license = body.license && body.license.name && body.license.url ? `[${body.license.name}](${body.license.url})` : body.license && body.license.name || "None";
			const footer = [];
			if (body.fork) footer.push(`❯ **Forked** from [${body.parent.full_name}](${body.parent.html_url})`);
			if (body.archived) footer.push("❯ This repository is **Archived**");

			return message.channel.send({ embed: new MessageEmbed
				.setTitle(body.full_name)
				.setAuthor("GitHub", "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png")
				.setURL(body.html_url)
				.setThumbnail(body.owner.avatar_url)
				.setColor(es.color)
				.setFooter(es.footertext, es.footericon)
				.setDescription(`${body.description || "No Description."}\n\n❯ **Language:** ${body.language}\n❯ **Forks:** ${body.forks_count.toLocaleString()}\n❯ **License:** ${license}\n❯ **Open Issues:** ${body.open_issues.toLocaleString()}\n❯ **Watchers:** ${body.subscribers_count.toLocaleString()}\n❯ **Stars:** ${body.stargazers_count.toLocaleString()}\n❯ **Size:** ${size}${footer.length ? `\n${footer.join("\n")}` : ""}`) });
		} catch (e) {
			console.log(e)
			return message.channel.send(new MessageEmbed()
			  .setTitle(`<a:no:865963806483808256> An error occurred`)
			  .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
			);
		  }
	
	}
}