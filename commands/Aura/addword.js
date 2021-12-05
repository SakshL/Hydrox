const Discord = require('discord.js');
const db = require('quick.db');
const colors = require('./../../colors.json')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'addword',
    cooldown: 5,  
    permissions: 'ADMINISTRATOR',
    description: 'Add a word to the word-list.',
    run: async (client, message, args) => {
        const guildicon = message.guild.iconURL();
        let anitswear = db.get(`anitbadwords_${message.guild.id}`);
        let word = args.slice(0).join(' ');
        if (!word) {
            let missingargs = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
                .setDescription(`**Invalid Usage\naddword(word)\nExample:\naddword fuck**`)
                .setColor(colors.uptime)
            return message.channel.send(missingargs);
        }
        if (anitswear && anitswear.find((find) => find.swearword == word)) {
            let exist = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
                .setDescription(`**${word} It's Already on Bot Database!**`)
                .setColor(colors.uptime)
            return message.channel.send(exist);
        }
        let data = {
            swearword: word,
            author: message.author.tag,
        };
        db.push(`anitbadwords_${message.guild.id}`, data);
        let added = new Discord.MessageEmbed().setColor(colors.uptime).setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`).setDescription(`**${word}** Has Been Added <a:yes:847689262827569183>`);
        return message.channel.send(added);
    },
};
