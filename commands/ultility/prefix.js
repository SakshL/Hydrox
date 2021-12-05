const Discord = require('discord.js')
const db = require('quick.db')
const emoji = require('../../emoji.json')

module.exports = {
  name: "prefix",
  category: "config",
  usage: "prefix [<]prefix]",
  description: " set server prefix",
  run: async(client, message, args) => {
        console.log("setprefix")

        const PREFIX = db.get(`guild_${message.guild.id}_prefix`) || ","

        if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply('You don not have the required permissions to use this command.')

        if (!args.length) {
            const embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(`${PREFIX}setprefix <prefix>`)

            message.channel.send(embed)
        }


        if (args[0]) {

            const pAlready = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`That is already your prefix.`)

            if (args[0] === db.get(`guild_${message.guild.id}_prefix`)) return message.channel.send(pAlready) // already

            if (args[0] === ",") db.delete(`guild_${message.guild.id}_prefix`)

            db.set(`guild_${message.guild.id}_prefix`, args[0])

            let pEmbed = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle("Prefix changed!")
                .setDescription(`New prefix set to ${args[0]}`);

            message.channel.send(pEmbed)
        }
    }
}