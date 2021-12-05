const { Client, Message, MessageEmbed } = require('discord.js');
const path = require('path');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'phintro',
    aliases: ['pornhub'], 
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
		  .setFooter('Thanks For Using me!')
		  .setTitle(`<:no:880293644408594443> You need to join a voice channel`)
		  );
	  if(botchannel)
		  return message.channel.send(new MessageEmbed()
		  .setColor("RED")
		  .setFooter('Thanks For Using Me!')
		  .setTitle(`<:no:880293644408594443> I am already connected in \`${botchannel.name}\``)
	  );
	  const e = await message.react('🎙️').catch(()=>{})
	channel.join().then(async connection => {
		const dispatcher = connection.play(path.join(__dirname + '/audios/phintro.mp3'));
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