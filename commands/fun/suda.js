const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
  name: "sudo",
  description: "sudo webhook",
  category: "fun",
  
   async run (client, message, args) {
    
    
    

      if (!args[1]) return message.reply('Please provide a message to send \n ```\n usages: sudo [mention] [text]```')
        const member = message.mentions.members.first()
 if (!member) return message.reply('Please tag a user')
 message.channel.createWebhook(member.user.username, {
     avatar: member.user.displayAvatarURL({dynamic: true})
 }).then(webhook => {
     webhook.send(args.slice(1).join(' '))
     setTimeout(() => {
         webhook.delete()        
     }, 3000)
  })
  
    
    
  }
}