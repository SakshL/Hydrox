const Discord = require('discord.js')
const emoji = require('../../emoji.json')
const webhook = new Discord.WebhookClient('874127584202465332', 'Z5qne_SoLE9MaEJUVYESPVRbSHrYZU1zV2LE4WjJMMG6p9-3u82buqWZO1LK8lpgd65M')
module.exports = {
  name: "feedback",
  description: "feedback command (embed style)",

  run: async(bot, message, args) => {

    if (!args[0]) return message.reply('please provide feedback! :)')
    message.react('<:sucess:873787854646575164>')
    message.reply(`✉ | ${message.author.username}, Thanks For The Feedback! :)`)

    const feedbackEmbed = new Discord.MessageEmbed()
      .setTitle(`${message.author.username}#${message.author.discriminator} (${message.author.id}) Feedback:`)
      .setDescription(`${args} 🗯`)
      .addField("On the server:", `${message.guild.name}`)
      .addField("Server ID:", `${message.guild.id}`)
      .setTimestamp()
      .setColor('#303136')

    webhook.send(feedbackEmbed)

    
  }
}