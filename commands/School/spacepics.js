const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')
const emoji = require('../../emoji.json')
const dotenv = require('dotenv')
dotenv.config()

  module.exports = {
  name: "spacepics",
  description: "space images command",
  category: "space",
  run: async (client, message, args) => {
    // Destructure the things we need out of props

    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_TOKEN}`
    )
    const json = await res.json()
    //console.log(json)
    const imageUrl = json.hdurl
    const { title } = json

    // `${title}\n${imageUrl}`
    return message.channel.send(new MessageEmbed()
    .setTitle(`${title}`)
    .setColor('#08f0fc')
    .setImage(`${imageUrl}`)
    .setFooter(`Requested by - ${message.author.username} 🌌`)
    )
  }
}