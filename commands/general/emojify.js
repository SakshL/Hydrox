const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
  name: "emojify",
  description: 'emojify!',
  category: 'fun',
  usages: 'emojify [text]',
  async run (client, message, args) {
    
      
const mapping = {
  ' ': '   ',
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
  '!': ':grey_exclamation:',
  '?': ':grey_question:',
  '#': ':hash:',
  '*': ':asterisk:'
};
'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
})
    let oof = message.content.split(" ").slice(1)
    if(oof.length < 1) {
    message.channel.send('You must provide some text to emojify!');
   }
  message.channel.send(oof.join(' ').split('').map(c => mapping[c] || c).join(''));

   
}
 
}