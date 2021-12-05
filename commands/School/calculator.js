const { MessageEmbed } = require("discord.js");
const { Calculator } = require('weky')
const disbut = require('discord-buttons')
const emoji = require('../../emoji.json')

require('@weky/inlinereply');
module.exports = {
  name: "calculator",
  description: "",
  usage: "",
  aliases: ['c'],
  run: async (client, message, args) => {
    await Calculator({
        message: message,
        embed: {
            title: 'Calculator ',
            color: '#303136',
            timestamp: true,
        },
        disabledQuery: 'Calculator is disabled!',
        invalidQuery: 'The provided equation is invalid!',
        othersMessage: 'Only <@{{author}}> can use the buttons!',
    });
}}