
const Discord = require('discord.js')
const fetch = require('node-fetch')
const emoji = require('../../emoji.json')

module.exports = {
  name: 'binary',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  async run (client , message , args) {

 let word = args.join(" ")
if(!args[0]) return message.reply("Please provide either `encode` or `decode` as the 1st argument")

if(args[0].toLowerCase() === "encode") {
  word = args.slice(1).join(" ")
   if(!args[1]) return message.reply('Please provide some text to encode!')
   const data = await fetch(`https://api.popcatdev.repl.co/encode?text=${encodeURIComponent(word)}`)
   const json = await data.json();
   let embed = new Discord.MessageEmbed()
   .setTitle("Binary Converter Machine")
   .addField('Text', `\`\`\`py\n${args.slice(1).join(" ")}\`\`\``)
   .addField('Binary', `\`\`\`py\n${json.binary}\`\`\``)
   .setColor("#05aaac")
   message.channel.send(embed)
} else if(args[0].toLowerCase() === "decode") {
  word = args.slice(1).join(" ")
   if(!args[1]) return message.reply('Please provide some binary numbers to decode!')
   let arr = ["0","1"]
   for (let i in arr) {
     if (!word.includes(arr[i])) return message.reply("These are not valid binary numbers!")
   }
   const data = await fetch(`https://api.popcatdev.repl.co/decode?binary=${encodeURIComponent(word)}`)
   const json = await data.json();
   
   let embed = new Discord.MessageEmbed()
   .setTitle("Binary Converter Machine")
   .addField('Binary', `\`\`\`py\n${args.slice(1).join(" ")}\`\`\``)
   .addField('Text', `\`\`\`py\n${json.text}\`\`\``)
   .setColor("#05aaac")
   message.channel.send(embed)
} else {
  message.reply('1st argument must be either `encode` or `decode`')
}
  }
}