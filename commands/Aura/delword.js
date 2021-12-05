const Discord = require('discord.js');
const db = require('quick.db');
const colors = require('./../../colors.json')
const emoji = require('../../emoji.json')

module.exports = {
  name: 'delword',
  cooldown: 5, 
  description: 'Remove a word from the word-list.',
    run: async (client, message, args) => {
        const guildicon = message.guild.iconURL();

        let word = args.slice(0).join(' ');
        if (!word) {
            let embed = new Discord.MessageEmbed()
                
                .setDescription(`**Invalid Usage\ndelword(word)\nExample:\ndelword fuck**`)
                .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)
                return message.channel.send(embed);
        }
        let database = db.get(`anitbadwords_${message.guild.id}`);

        if (database) {
            let data = database.find((x) => x.swearword === word.toLowerCase());
            let unabletofind = new Discord.MessageEmbed()
                
                .setDescription(`**I could not find that word in the database.*`)
                .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

            if (!data) return message.channel.send(unabletofind);

            let value = database.indexOf(data);
            delete database[value];

            var filter = database.filter((x) => {
                return x != null && x != '';
            });

            db.set(`anitbadwords_${message.guild.id}`, filter);
            let deleted = new Discord.MessageEmbed()
                
                .setDescription(`**Deleted ${word} from Anit-WordList!** `)
                .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

            return message.channel.send(deleted);
        } else {
            let okelse = new Discord.MessageEmbed()
                
                .setDescription(`**Sorry, I am unable to find that word.**`)
                .setAuthor(`${message.author.username}`, `${message.author.avatarURL({dynamic:true})}`)

            return message.channel.send(okelse);
        }
    },
};
