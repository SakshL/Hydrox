const Discord = require('discord.js')

module.exports = {
    name: "embed",
    description: "make embed",

    async run(client, message,  args){
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed()
        .setColor("RED")
        .setDescription("you don't have permission to use this command! ")
        .setTimesta
        )
        let color = args[0] 
        let title = args[1] 
        let description = args.slice(2).join(" ")
        const error = new Discord.MessageEmbed() 
        .setColor('#e01e01')
        .setTitle('**${emoji.error} ERROR INVALID USE**')
        .setDescription('`,embed color i.e(YELLOW) title description`')

        if(!color) return message.channel.send(error)
        if(!title) return message.channel.send(error)
        if(!description) return message.channel.send(error)

        const embed = new Discord.MessageEmbed()
        .setTitle(`**${title}**`)
        .setColor(color)
        .setDescription(description)
        .setFooter(`By - ${message.author.username}`)
        .setTimestamp()
        await message.delete()
        message.channel.send(embed)
    }
}