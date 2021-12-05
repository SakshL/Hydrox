const Discord = require('discord.js')
const emoji = require('../../emoji.json')
module.exports = {
  name: 'minecraft',
  

  run :async (client , message , args) => {
  const sentence = args.join(" ")
    
    if (!sentence) return message.channel.send('Please specify a text.')
    if (sentence > 22) return message.channel.send("Please type a text no bigger than 22 characters")
    let embed = new Discord.MessageEmbed()
      .setTitle('Achievement unlocked!')
      .setImage(`https://api.cool-img-api.ml/achievement?text=${sentence}`)
      .setColor('RANDOM')
      .setFooter(' ');
    message.channel.send(embed)
  }
}