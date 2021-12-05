const randomPuppy = require('random-puppy')
const { MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'meme',
    description: "LMFAO",
    usage: "meme",
    run: async(client, message, args) => {

        const subReddits = ['dankmemes']//You can have name of any subreddit here
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random)


        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(img)
        .setTitle(`Meme from ${random} subreddit`)
        .setURL(`https://reddit.com/r/${random}`)
        .setFooter('🤣😂')
        .setTimestamp()
    message.channel.send(embed);

    }
}