const { MessageEmbed } = require('discord.js');
const Random = require("srod-v2");
const emoji = require('../../emoji.json')

module.exports = {
    name: 'changemymind',
    category: 'images',
    description: 'Change your mind',
    usage: '*changemymind',
    aliases: [''],

    run: async(bot, message, args) => {
    
        let change = args[0];
    if (!change) return message.channel.send("Please provide the text");

    let data = await Random.ChangeMyMind({ Message: change });

    message.channel.send(data);
    }
};