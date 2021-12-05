const { Client, Message, MessageEmbed } = require('discord.js');
const { MessageMenuOption, MessageMenu } = require('discord-buttons');
const emoji = require('../../emoji.json')
module.exports = {
    name: 'setupall',
    aliases: ['test'], 
    description: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      //embeds
      const setupembed = new MessageEmbed()
      .setTitle('test')
      .setDescription('test')
      .setFooter('test', client.user.displayAvatarURL({ dynamic: true}))

      //Menu
      let test = new MessageMenuOption()
      .setLabel('test')
      .setValue('setuptest')
      .setDescription('test')
      
      //all menu

      let alloptions = new MessageMenu()
      .setID('customid')
      .setPlaceholder('Click me for setup')
      .setMaxValues(1)
      .setMinValues(1) // this is not required
      .addOption(test)

      //send message
      const Setup = await message.channel.send(setupembed, alloptions)
      //functions
      const filter = ( button ) => button.clicker.user.id === message.author.id;
   let collector = Setup.createMenuCollector(filter, { time : 10000 });
    collector.on('collect',  (m) => {
      if(m.values[0] == "setuptest") {
        Setup.edit('mention channel \`#<channel>\`')
      }
      m.reply.defer();
    })
      
    }
} 