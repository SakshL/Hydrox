const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
const emoji = require('../../emoji.json')

module.exports = {
        name: "beg",
        noalias: [""],
        category: "economy",
        description: "Beg for money",
        usage: " ",
        accessableby: "everyone",
    run: async (client, message, args) => {
        let user = message.author;

        let timeout = 120000;
        let amount = 20;

        let beg = await db.fetch(`beg_${user.id}`);

        if (beg !== null && timeout - (Date.now() - beg) > 0) {
            let time = ms(timeout - (Date.now() - beg));

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${emoji.error} You've already begged recently\n\nBeg again in ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`${emoji.sucess} You've begged and received ${amount} coins`);
            message.channel.send(moneyEmbed)
            db.add(`money_${user.id}`, amount)
            db.add(`begs_${user.id}`, 1)
            db.set(`beg_${user.id}`, Date.now())

        }
    }
};