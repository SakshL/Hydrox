const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require("ms")
const emoji = require('../../emoji.json')
module.exports = {
    name: 'gend',
    aliases: ['end'],
    description : '<giveaway message id>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;

        if(!args[0]) return message.reply("You need to specify the message ID!")

        let giveaway = 
        // sdfds
        client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
        // sdfsd
        client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if(!giveaway){
            return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') + '`.');
        }
        client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
        // sfsd againb XDDDDD
        .then(() => {
            message.channel.send('Giveaway will end in less than '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
        })
        .catch((e) => {
            if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
                message.channel.send('This giveaway is already ended!');
            } else {
                // console.error(e);
            message.channel.send('An error occured...');
            }
        })
            
    }
}