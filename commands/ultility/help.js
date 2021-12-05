const Discord = require('discord.js')
const {MessageButton, MessageActionRow} = require("discord-buttons");
const { MessageEmbed } = require('discord.js')
const disbut = require("discord-buttons");
const emoji = require('../../emoji.json')
const prefix = ","
const client = new Discord.Client();
module.exports = {
  name: "",
  description: "*help menu",
  aliases: ["hm"],
  ownerOnly: false,
  run: async(client, message, args) =>{
  let embed = new MessageEmbed()
  .setTitle(`<:category:880079054437515334> **__My Features__**`) 
  .setDescription("> One of the Best <:moderation:866155254399500288> **Al In One Discord Bot!** **Moderation**, Info, **Utility**, **Economy**, And Also A New Awesome <:Security:867002790077661234> **Security** System! <:up1:866155257583501342> Many **Minigames** And <:fun:866155255321853982> **Fun Commands** (200+) <:setting:874348670382911578> **Administration** and **Auto-Moderation** and Way Much More!")
.addField(":question: **__How Do You Use Me?__**",
`>>> \`${prefix}help\` You Can Also Watch My Tutorial Video\`${prefix}setup\` e.g. \`${prefix}host\``)
.addField(":chart_with_upwards_trend: **__STATS:__**")
.setColor("RAND")
.setImage('https://cdn.discordapp.com/attachments/880063845442400329/880083061763629096/standard_1.gif')
.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
.setTimestamp()


let option = new disbut.MessageMenuOption()
    .setLabel('Admin & Moderation')
    .setEmoji('880073997751058443')
    .setValue('1')
    .setDescription('Use Admin & Moderation Commands To Make Your Serve Safe ')
    
   
let selectdiscord = new disbut.MessageMenu()
    .setID('1')
    .addOption(option)
    .setPlaceholder('Click Me For Help Menu')
    .setMaxValues(1)
    .setMinValues(1)

    let row = new MessageActionRow()
    .addComponents(selectdiscord)
   
    message.channel.send(embed, row)
     
    }
  }

client.on('clickMenu', async(menu) => {
  await menu.reply.defer({ ephemeral: true })
  if (menu.values[0] === "1") {
    let hop = new Discord.MessageEmbed()
  .setAuthor(menu.clicker.user.tag,menu.clicker.user.displayAvatarURL())
  .setTitle('Admin Commands')
  .setDescription(`\`addrole\` \`auditlog\` \`ban\` \`dm\` \`embed\` \`hackban\` \`kick\` \`lock\` \`nuke\` \`removerole\` \`addemoji\` \`unban\` \`unlock\``)
  message.channel.send(hop)
  }
})
