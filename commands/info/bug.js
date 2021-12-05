const { MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'report-bug',
    aliases: ['bug'],
    ownerOnly: false,

    run: async (client, message, args) => {
        message.reply('Please Check Your dms!');
        const questions = [
            'What is your username and tag?',
            'What is the title you want to give to that bug?',
            'What is the bug?',
            'What is the command',
            "Do you have any idea, How can we fix the bug? (If you don't, Respond with (no))"
        ];

        let collectCounter = 0;
        let endCounter = 0;

        const filter = m => m.author.id === message.author.id;
        const appStart = await message.author.send(questions[collectCounter++]);
        const channel = appStart.channel;

        const collector = channel.createMessageCollector(filter);

        collector.on('collect', () => {
            if (collectCounter < questions.length) {
                channel.send(questions[collectCounter++]);
            } else {
                channel.send(`Thanks For Your Feedback! i have repoted this bug to bug channel!`);
                collector.stop('fulfilled');
            }
        });
        const appChannel = client.channels.cache.get('873980542327066684');
        collector.on('end', (collected, reason) => {
            if (reason === 'fulfilled') {
                let index = 1;
                const mapped = collected
                    .map(msg => {
                        return `**${index++})** | ${questions[endCounter++]}\n>  ${
                            msg.content
                        }`;
                    })
                    .join('\n\n');
                appChannel.send(
                    new MessageEmbed().setAuthor(
                        message.author.tag,
                        message.author.displayAvatarURL({ dynamic: true })
                    ).setTitle`New Bug Reported`
                        .setDescription(mapped)
                        .setColor("#303136")
                        .setTimestamp()
                );
            }
        });
    }
};