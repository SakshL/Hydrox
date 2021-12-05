const fetch = require("node-fetch")
const { MessageEmbed, MessageMentions } = require('discord.js')
const emoji = require('../../emoji.json')

module.exports = {
    name: "deepfry",
    description: "Deepfry someone!",
    run: async(client, message, args) => {
        const user = message.mentions.members.first() || message.member || message.guild.users.cache.get(u => u.id === args[0])
        const avatar = user.user.displayAvatarURL({ dynamic: false, size: 4096})
        fetch(`https://nekobot.xyz/api/imagegen?type=deepfry&image=${avatar}`)
        .then((res) =>  res.json())
        .then((data) => {
            let embed = new MessageEmbed()
            .setTitle("Deepfried!")
            .setImage(data.message)
            .setTimestamp()
            message.channel.send(embed)
        })
    }
}