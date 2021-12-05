const { Client, Message, MessageEmbed } = require('discord.js');
const { Snake } = require('weky')
const emoji = require('../../emoji.json')

module.exports = {
  name: 'snake',
  aliases: ['c'], 
  description: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
  await Snake({
    message: message,
    embed: {
      title: 'Snake',
      description: 'GG, you scored **{{score}}** points!',
      color: 'RANDOM',
      timestamp: true,
    },
    emojis: {
      empty: '⬛',
      snakeBody: ':snake:',
      food: ':hamburger:',
      up: '⬆️',
      right: '⬅️',
      down: '⬇️',
      left: '➡️',
    },
    othersMessage: 'Only <@{{author}}> can use the buttons!',
    buttonText: 'Cancel',
});
}}