const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'kick',
    aliases: ['k'], 
    description: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Discord} discord
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(new MessageEmbed()
        .setDescription(`${emoji.error} you can't use this command!`)
        .setColor("RED")
        )
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.reply( new MessageEmbed()
        .setDescription("please mention Member to kick!")
        .setColor('#303136')
        )

        if(
            message.member.roles.highest.position <=
            member.roles.highest.position
        ) return message.channel.send(`${message.author} you cant kick to this user!`)

        const reason = args.slice(1).join(" ") || "No reason!";

        member.kick(reason);
        
        message.channel.send(new MessageEmbed()
        .setDescription(`${emoji.userkick} ${member.user.username} has been kicked || for ${reason}`)
        )
        client.modlogs(
            {
            Member: member,
            Action: 'kick',
            Color: "RED",
            Reason: reason,
        }, 
        message
        );
    }
}