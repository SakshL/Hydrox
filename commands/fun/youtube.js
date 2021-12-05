const { Client, Message, MessageEmbed, Discord } = require('discord.js');
const fetch = require("node-fetch");
const config = require('../../config.json')
const emoji = require('../../emoji.json')

module.exports = {
    name: 'youtube',
    aliases: [''], 
    description: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
    try {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(new MessageEmbed()
            .setColor("RED")
            .setFooter("")
            .setTitle("<:no:880293644408594443> Error | Please join a Voice Channel first")
        );
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) {
          const nochannel = new MessageEmbed()
          .setDescription(`I need \`CREATE_INSTANT_INVITE\` permission!`)
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          return message.channel.send(nochannel);
        }
        await fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 1,
                target_application_id: "755600276941176913", // youtube together
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${config.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(invite => {
            if (invite.error || !invite.code) {
                return message.channel.send(new MessageEmbed()
                .setDescription(`Cannot start the youtube together, please retry`)
                .setColor(es.wrongcolor)
                .setFooter(es.footertext, es.footericon));
            }
            message.channel.send(`Click on the Link to start the GAME:\n> https://discord.com/invite/${invite.code}`);
        })
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor("RED")
                .setFooter('')
                .setTitle(`<:no:880293644408594443> An error occurred`)
                .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            );
        }
  }
} 