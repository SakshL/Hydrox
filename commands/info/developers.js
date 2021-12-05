const { MessageEmbed } = require("discord.js")
const { MessageButton } = require('discord-buttons')
const emoji = require('../../emoji.json')

module.exports = {
	name: "developer",
	category: "🔰 Info",
	aliases: ["dev", "sakshyam"],
	description: "*Shows Information About The Developer*",
	useage: "developer",
	run: async (client, message, args) => {
		try {
			let button_public_invite = new MessageButton().setStyle('url').setLabel('Invite Our Bot').setURL("https://discord.com/oauth2/authorize?client_id=849523433657466890&permissions=2147875904&scope=bot")
			let button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.gg/ghQ64n9h")
			let button_invite = new MessageButton().setStyle('url').setLabel('Bot List Website').setURL(`https://topicz.xyz/`)
			const allbuttons = [button_public_invite, button_support_dc, button_invite]
			message.channel.send({embed: new MessageEmbed()
				.setColor("RANDOM")
				.setFooter("")
				.setTimestamp()
				.setThumbnail("https://images-ext-2.discordapp.net/external/oUP4U0sZ33M7Pe1e1zfP4TRckF04yemZvFs_owvBJHQ/%3Fsize%3D512/https/cdn.discordapp.com/avatars/745581095747059722/ca13e740175a778d779cd2f8d0e4084e.webp?width=410&height=410")
				.setTitle("- SΛКSHЏΛM \ Developer Of Uptimer")
				.setURL("https://discord.gg/r7ZRYnYK2g")
				.setDescription(`
 Hello I Am **Sakshyam** <@745581095747059722>
Hyrox Is The Best Discord Bot With 300+ Commands!
 **Please Thank Our Contributors !**
 > <@506505845215985674>
 > <@831196752798547978>
 > <@745581095747059722>
 > <@440200028292907048>`),
buttons: allbuttons
			}).catch(error => console.log(error));
		} catch (e) {
			console.log(String(e.stack).bgRed)
			return message.channel.send(new MessageEmbed()
				.setColor("RANDOM")
				.setFooter("aaaa")
				.setTitle(`<:no:833101993668771842> An error occurred`)
				.setDescription(`\`\`\`${String(e.stack).substr(0, 2000)}\`\`\``)
			);
		}
	}
}