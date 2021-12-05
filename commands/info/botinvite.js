const Discord = require(`discord.js`)
const { MessageButton } = require('discord-buttons')
const emoji = require('../../emoji.json')

module.exports = {
name : "botinvite",
run : async(client, message) => {
  let bot = message.content.split(" ").slice(1).join(" ");
const u = new MessageButton()
   .setStyle('url')
   .setLabel("Invite Bot")
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${bot}&Permissions=8&scope=bot`)
      .setEmoji("849527249330110485")

    
if(!bot) return message.channel.send(`> ** :confused: - Please Send A Bot Id **`)
if(isNaN(bot)) return message.channel.send('Please Aproved Vaild Id');
const embed = new Discord.MessageEmbed()
.setTitle('<a:idk:873833709864902676> The Bot Invite Is:')
.setDescription(`[Click Here To Invite The Bot](https://discord.com/api/oauth2/authorize?client_id=${bot}&Permissions=8&scope=bot)`)
  message.channel.send(embed , u)
  

}
}