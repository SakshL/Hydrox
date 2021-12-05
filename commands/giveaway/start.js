const { Client, Message, MessageEmbed } = require('discord.js');
const ms = require("ms")
const config = require('../../config.json')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'gstart',
    aliases: ['start'],
    usage: "<#channel> <time> <winners> <Price>",
    description : '<#channel> <time> <winners> <Price>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return;

        let giveawayChannel = message.mentions.channels.first();
        if(!giveawayChannel) return message.reply("You need to specify a channel!")

        let giveawayDuration = args[1];
        if(!giveawayDuration) return message.reply("You need to specify the duration of the giveaway!")

        let giveawayNumberWinners = args[2];
        if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
            return message.channel.send('You have to specify a valid number of winners!');
        }

        let giveawayPrize = args.slice(3).join(' ');
        if(!giveawayPrize) return message.reply("You need to specify a prize!")

        client.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),

            prize: giveawayPrize,

            winnerCount: parseInt(giveawayNumberWinners),

            hostedBy: config.hostedBy ? message.author : message.author,

            messages: {
                giveaway: (config.everyoneMention ? "@everyone\n\n" : "")+"<a:gw:872147909372698664> <a:gw:872147909372698664> **GIVEAWAY** <a:gw:872147909372698664> <a:gw:872147909372698664>",
                giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+"<a:gw:872147909372698664> <a:gw:872147909372698664> **GIVEAWAY ENDED** <a:gw:872147909372698664> <a:gw:872147909372698664>",
                timeRemaining: "Time remaining: **{duration}**!",
                inviteToParticipate: "React with 🎉 To Participate!",
                winMessage: "<a:price:872148392711704666>Congratulations, {winners}! You won **{prize}**!<a:price:872148392711704666>",
                embedFooter: "Giveaway",
                noWinner: "<:error:872104702626639922> Giveaway cancelled, no valid participations.",
                hostedBy: "Hosted by: {user}",
                winners: "winner(s)",
                endedAt: "Ended at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        })
        message.delete()
    }
}