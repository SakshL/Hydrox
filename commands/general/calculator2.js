const { Client, Message, MessageEmbed } = require('discord.js');
const {Calculator} = require('weky')
const emoji = require('../../emoji.json')
require('@weky/inlinereply');
module.exports = {
    name: 'calc',
    aliases: ['c'], 
    description: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
    await Calculator({
    message: message,
    embed: {
        title: 'Calculator',
        color: '#7289da',
        timestamp: true
    },
    disabledQuery: 'Calculator is disabled!',
    invalidQuery: 'The provided equation is invalid!',
    othersMessage: 'Only <@{{author}}> can use the buttons!'
});
    }
}