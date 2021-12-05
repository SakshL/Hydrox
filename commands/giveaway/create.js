const { Message, MessageEmbed } = require('discord.js');
const Nuggies = require('nuggies');
const emoji = require('../../emoji.json')
const giveaway = {};
const ms = require('ms');

module.exports = {
    name: 'create',
    aliases: [''], 
    description: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, { max: 7, time: 60 * 1000 });
    let step = 0;

    message.channel.send('What is the prize?');
    collector.on('collect', async (msg) => {
        if (!msg.content) return collector.stop('error');

        step++;
        if (step == 1) {
            const prize = msg.content;
            message.channel.send(`The prize is **${prize}**! Which channel do you want to host in?`, { allowedMentions: { roles: [], users: [], parse: [] } });
            giveaway.prize = prize;
        }
        else if (step == 2) {
            const channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(msg.content);
            if (!channel) return collector.stop('error');
            giveaway.channel = channel.id;
            message.channel.send(`Channel Is <#${channel.id}>! Now How Many Winners Do You Want?`);
        }
        else if (step == 3) {
            const winners = msg.content;
            if (isNaN(winners)) return collector.stop('error');
            if (parseInt(winners) > 10) {
                message.reply('You cannot have more than 10 winners!');
                return collector.stop('error');
            }
            giveaway.winners = parseInt(winners);
            message.channel.send(`${winners} winner(s) will be chosen for this giveaway! How much time do you want?`);
        }
        else if (step == 4) {
            const time = msg.content;
            if (!ms(time)) return collector.stop('error');
            giveaway.time = time
            if (ms(giveaway.time) > ms('14d')) return collector.stop('HIGH_TIME');
            message.channel.send(`The time is now set to ${time}! Who is hosting the giveaway?`);
        }
        else if (step == 5) {
            const host = msg.mentions.users.first() || msg.guild.members.cache.get(msg.content) || message.member;

            giveaway.host = host.id;
            message.channel.send(`The host is ${host}! Now do you want any requirements for the giveaway?`);
        }
        else if (step == 6) {
            if (!['yes', 'no'].includes(msg.content.toLowerCase())) return collector.stop('error');
            giveaway.requirements = { enabled: msg.content == 'yes' ? true : false };
            return message.channel.send(`Is this correct?\n\`\`\`Prize: ${giveaway.prize}\nWinner(s): ${giveaway.winners}\nTime: ${ms(giveaway.time)}\nhost: ${message.guild.members.cache.get(giveaway.host).user.username}\nRequirements: ${giveaway.requirements.enabled ? 'Yes' : 'No'}\n\`\`\`Reply with \`yes\` or \`no\`!`);
        }
        else if (step == 7) {
            if (!['yes', 'no'].includes(msg.content)) return collector.stop('error');
            if (msg.content == 'yes') return collector.stop('done');
            if (msg.content == 'no') return collector.stop('cancel');
        }
    });

    collector.on('end', async (msgs, reason) => {
        if (reason == 'time') return message.channel.send('You did not reply in time!');
        if (reason == 'error') return message.channel.send('You did not provide valid option!');
        if (reason == 'cancel') return message.channel.send('Cancelled giveaway setup due to wrong info!');
        if (reason == 'HIGH_TIME') return message.channel.send('The time cannot be more than 14 days!');

        if (reason == 'done' && giveaway.requirements.enabled) {
            message.channel.send('You can use role requirements: `role=ID`!(without spaces) Once you are finished putting requirements say `done`');
            const rcollector = message.channel.createMessageCollector(filter, { time: 60 * 1000, max: 1000 });
            rcollector.on('collect', async (m) => {

                if (!['done', 'stop', 'cancel'].includes(m.content.toLowerCase()) && !m.content.includes('role=')) return rcollector.stop('error');
                if (m.content.toLowerCase() == 'done') return rcollector.stop('done');

                if (!giveaway.requirements.roles) giveaway.requirements.roles = [];
                const id = m.content.split(' ').join('').split('=')[1];

                if (!message.guild.roles.cache.get(id)) return message.channel.send('That is not a valid role!');
                giveaway.requirements.roles.push(m.content.split(' ').join('').split('=')[1]);
                message.channel.send(`Added the role to requirements!\n\`\`\`\n${giveaway.requirements.roles.map(x => message.guild.roles.cache.get(x).name).join('\n')}\n\`\`\``, { allowedMentions: { roles: [], parse: [], users: [] } });
            });

            rcollector.on('end', async (msg, r) => {
                if (r == 'time') return message.channel.send('You did not reply in time!');
                if (r == 'error') return message.channel.send('You did not provide valid option!');
                if (r == 'cancel') return message.channel.send('Cancelled giveaway setup due to wrong info!');

                if (r == 'done') {
                    Nuggies.giveaways.Messages(client);
                    Nuggies.giveaways.create({
                        message: message,
                        prize: giveaway.prize,
                        host: giveaway.host,
                        winners: giveaway.winners, endAfter: giveaway.time, requirements: giveaway.requirements, channel: giveaway.channel,
                    });
                    await message.channel.send('Created a giveaway!!').then(m => setTimeout(() => m.delete(), 2000));
                }
            });
        }
        else {
          console.log(message);
          Nuggies.giveaways.Messages(client);
            Nuggies.giveaways.create({
                message: message,
                prize: giveaway.prize,
                host: giveaway.host,
                winners: giveaway.winners,
                endAfter: giveaway.time,
                requirements: giveaway.requirements,
                channel: giveaway.channel,
            });
            await message.channel.send('Created a giveaway!').then(m => setTimeout(() => m.delete(), 2000));
        }
    });
}
}