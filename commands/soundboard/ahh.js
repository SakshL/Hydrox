const { Client, Message, MessageEmbed } = require('discord.js');
const path = require('path');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'ahh',
    aliases: ['ahh'], 
    description: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      const channel = message.member.voice.channel;
	  const botchannel = message.guild.me.voice.channel;
	  if(!channel) 
		  return message.channel.send(new MessageEmbed()
		  .setColor("GREEN")
		  .setTitle(`Fuck You Bitch. Learn Some Manners`)
		  );
	  if(botchannel)
		  return message.channel.send(new MessageEmbed()
		  .setColor("RED")
		  .setTitle(`Fuck You Bitch. Learn Some Manners`)
	  );
	  const e = await message.react('🎙️').catch(()=>{})
	channel.join().then(async connection => {
		const dispatcher = connection.play(path.join(__dirname + '/audios/ahh'));
		dispatcher.on('speaking', speaking => {
			if(!speaking) {
        channel.leave();
        e.remove()
       }
		});
	}).catch(err => console.log(err));
    }
}
//join vc