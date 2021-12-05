/**
  * @INFO
  * Loading all needed File Information Parameters
*/
const config = require("../../botconfig/config.json"); //loading config file with token and prefix, and settings
const ee = require("../../botconfig/embed.json"); //Loading all embed settings like color footertext and icon ...
const emoji = require(`../../botconfig/emojis.json`);
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const { createBar, format, databasing, escapeRegex, isrequestchannel, getRandomInt, delay} = require("../../handlers/functions"); //Loading all needed functions
const requestcmd = require("../../handlers/requestcmds");
const {
  MessageEmbed
} = require(`discord.js`);
const { MessageButton, MessageActionRow } = require('discord-buttons')
//here the event starts
module.exports = async (client, message) => {
    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    if (!message.guild || !message.channel) return;
    //if the channel is on partial fetch it
    if (message.channel.partial) await message.channel.fetch();
    //if the message is on partial fetch it
    if (message.partial) await message.fetch();
    //ensure all databases for this server/user from the databasing function
    client.settings.ensure(message.guild.id, {
      prefix: config.prefix
    });
    //get the current prefix from the database
    let prefix = client.settings.get(message.guild.id, "prefix");
    //if not in the database for some reason use the default prefix
    if (prefix === null) prefix = config.prefix;
    //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [, matchedPrefix] = message.content.match(prefixRegex);
    //set a temp variable
    let not_allowed = false;
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift().toLowerCase();
    //if no cmd added return error
    if (cmd.length === 0){
      not_allowed = true;
      if(matchedPrefix.includes(client.user.id)) {
        return message.channel.send(`<:Spotify:846090652231663647> / <:Youtube:840260133686870036> **Start Listening to Music with: \`${prefix}play [SONG]\`, to see all Commands type: \`${prefix}help\`**`);
      }
      return;
      }
    //get the command from the collection
    let command = client.commands.get(cmd);
    //if the command does not exist, try to get it by his alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    //if the command is now valid
    if (command){
        if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
            client.cooldowns.set(command.name, new Discord.Collection());
        }
        const now = Date.now(); //get the current time
        const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
        const cooldownAmount = (0.5) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
        if (timestamps.has(message.author.id)) { //if the user is on cooldown
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
          if (now < expirationTime) { //if he is still on cooldonw
            const timeLeft = (expirationTime - now) / 1000; //get the lefttime
            try{ message.react("833101993668771842").catch(e => console.log("couldn't react this is a catch to prevent a crash".grey)); }catch{}
            not_allowed = true;
            return message.channel.send(`<:no:833101993668771842> Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`); //send an information message
          }
        }
        timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
      try {
        //if Command has specific permission return error
        if(command.memberpermissions) {
          if (!message.member.hasPermission(command.memberpermissions)) {
            try{ message.react("833101993668771842").catch(e => console.log("couldn't react this is a catch to prevent a crash".grey)); }catch{}
            not_allowed = true;
            message.channel.send(new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setTitle("<:no:833101993668771842> You are not allowed to run this command!")
              .setDescription(`You need these Permissions: \`${command.memberpermissions.join("`, ``")}\``)
            ).then(msg => {
              try{
                 msg.delete({timeout: 5000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey));
              }catch{ /* */ }
            });
          }
        }
        //get the current player
        const player = client.manager.players.get(message.guild.id);
        //if there is a player but no node
        if(player && player.node && !player.node.connected) await player.node.connect();

        if(command.parameters) {
          if(command.parameters.type == "music"){
             //get the channel instance
            const { channel } = message.member.voice;
            const mechannel = message.guild.me.voice.channel;
            //if not in a voice Channel return error
            if (!channel) {
              not_allowed = true;
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setTitle(`<:no:833101993668771842> You need to join a voice channel.`)
              );
            }
            //If there is no player, then kick the bot out of the channel, if connected to
            if(!player && mechannel) {
              await message.guild.me.voice.kick().catch(e=>console.log("This prevents a Bug"));
              await delay(client.ws.ping);
            }
            if(player && !mechannel){
              try{
                //edit the current song message
                try{
                  client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                    msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                      new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                      new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                      new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
                    ]}).catch((e)=>{console.log(e)})
                  }).catch((e)=>{console.log(e)})
                }catch{  }
                await player.destroy();
                await delay(client.ws.ping);
              }catch{ }
            }
            if(player && player.voiceChannel){
              try{
                let vc = message.guild.channels.cache.get(player.voiceChannel);
                if(!vc || !vc.name){
                  //edit the current song message
                  try{
                    client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                      msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                        new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                        new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                        new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
                      ]}).catch((e)=>{console.log(e)})
                    }).catch((e)=>{console.log(e)})
                  }catch{  }
                  await player.destroy();
                  await delay(client.ws.ping);
                }
              }catch{ }
            }
            if(!message.guild.me.permissionsIn(channel.id).toArray().includes("CONNECT")){
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setTitle(`<:no:833101993668771842> I am not allowed to connect to this Channel.`)
              );
            }
            if(!message.guild.me.permissionsIn(channel.id).toArray().includes("SPEAK")){
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setTitle(`<:no:833101993668771842> I am not allowed to speak in this Channel to this Channel.`)
              );
            }
            if(channel.userlimit && channel.userlimit != 0 && channel.full)
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setTitle(`<:no:833101993668771842> Your Voice Channel is full, I can't join!`)
              );
            if(channel.userlimit && channel.userlimit != 0 && channel.members && channel.members.size >= channel.userLimit)
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setTitle(`<:no:833101993668771842> Your Voice Channel is full, I can't join!!`)
              );
            if(!channel.joinable)
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setTitle(`<:no:833101993668771842> I am not able to join your Channel!`)
              );
            //if no player available return error | aka not playing anything
            if(command.parameters.activeplayer){
              if (!player){
                not_allowed = true;
                return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setTitle(`<:no:833101993668771842> There is nothing playing`)
                );
              }
              if (!mechannel){
                if(player) try{ 
                  //edit the current song message
                  try{
                    client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                      msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                        new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                        new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                        new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
                      ]}).catch((e)=>{console.log(e)})
                    }).catch((e)=>{console.log(e)})
                  }catch{  }
                  player.destroy();
                }catch{ }
                not_allowed = true;
                return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setTitle(`<:no:833101993668771842> I am not connected to a Channel`)
                );
              }
            }
            //if no previoussong
            if(command.parameters.previoussong){
              if (!player.queue.previous || player.queue.previous === null){
                not_allowed = true;
                return message.channel.send(new MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setTitle(`<:no:833101993668771842> There is no previous song yet!`)
                );
              }
            }
            //if not in the same channel --> return
            if (player && channel.id !== player.voiceChannel && !command.parameters.notsamechannel)
              return message.channel.send(new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setTitle(`<:no:833101993668771842> You need to be in my voice channel to use this command!`)
                .setDescription(`Channelname: \`🔈 ${message.guild.channels.cache.get(player.voiceChannel).name}\``)
              );
            //if not in the same channel --> return
            if (mechannel && channel.id !== mechannel.id && !command.parameters.notsamechannel)
            return message.channel.send(new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setTitle(`<:no:833101993668771842> You need to be in my voice channel to use this command!`)
              .setDescription(`Channelname: \`🔈 ${mechannel.name}\``)
            );
          }
        }
        //run the command with the parameters:  client, message, args, user, text, prefix,
        if(not_allowed) return;
        command.run(client, message, args, message.member, args.join(" "), prefix, player);
      }catch (e) {
        console.log(String(e.stack).red)
        return message.channel.send(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle("<:no:833101993668771842> Something went wrong while, running the: `" + command.name + "` command")
          .setDescription(`\`\`\`${e.message}\`\`\``)
        ).then(msg => {
          try{
             msg.delete({timeout: 5000}).catch(e=>console.log("couldn't delete message this is a catch to prevent a crash".grey))
          }catch{ /* */ }
        });
      }
    }
    else return
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
