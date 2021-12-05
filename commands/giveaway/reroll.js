const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'greroll',
    aliases: ['reroll'],
    description : '<givwaway message id>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;

        if(!args[0]) return message.reply("You need to specify the message ID!")

        let giveaway = 
        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        // Search with giveaway ID
        client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        // no gw
        if(!giveaway) {
            return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
        }

        // reroll
        client.giveawaysManager.reroll(giveaway.messageID)
        .then(() => {
            // Success message
            message.channel.send('Giveaway rerolled!');
        })
        .catch((e) => {
            if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
                message.channel.send('This giveaway is not ended!');
            } else {
                // console.error(e);
                message.channel.send('An error occured...');
            }
        })
    }
}