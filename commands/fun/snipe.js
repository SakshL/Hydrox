const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'snipe',
    aliases: [''], 
    description: '',
    run: async(client, message, args) => {
    const msg = client.snipes.get(message.channel.id)
    if(!msg) return message.channel.send(new MessageEmbed()
    .setTitle('No message deleted!')
    .setDescription('\`No messages to be snipe\`')
    .setTimestamp()
    )
    const embed = new MessageEmbed()
    .setTitle(msg.author)
    .setDescription('> ' + msg.content)
    .setFooter("Get sniped lmao!")
    .setTimestamp()
    if(msg.image) embed.setImage(msg.image)
    
    message.channel.send(embed)
    }
}