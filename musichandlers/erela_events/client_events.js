var {
    Manager
  } = require("erela.js"), {
      MessageEmbed
    } = require("discord.js"),
    ms = require("ms"),

    config = require("../../botconfig/config.json"),
    emoji = require('../../emoji.json')
    ee = require("../../botconfig/embed.json"),

    {
      databasing,
    } = require("../../musichandlers/functions");
    const { MessageButton, MessageActionRow } = require('discord-buttons')
  module.exports = (client) => {

      client.once("ready", () => {
        client.manager.init(client.user.id);
      });
      
      client.on("raw", (d) => client.manager.updateVoiceState(d));
      
      //Log if a Channel gets deleted, and the Bot was in, then delete the player if the player exists!
      client.on("channelDelete", async channel => {
        try {
          if (channel.type === "voice") {
            if (channel.members.has(client.user.id)) {
              var player = client.manager.players.get(channel.guild.id);
              if (!player) return;
              if (channel.id === player.voiceChannel) {
                //edit the current song message
                try{
                  client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                    msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                      new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                      new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                      new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
                    ]}).catch((e)=>{console.log("SOMETHING WENT WRONG HERE (39)")})
                  }).catch((e)=>{console.log("SOMETHING WENT WRONG HERE (40)")})
                }catch{  }
                //destroy
                player.destroy();
              }
            }
          }
        } catch {}
      })
      //If the Bot gets Remove from the Guild and there is still a player, remove it ;)
      client.on("guildRemove", async guild => {
        try {
          var player = client.manager.players.get(guild.id);
          if (!player) return;
          if (guild.id == player.guild) {
            //edit the current song message
            try{
              client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                  new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                  new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                  new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
                ]}).catch((e)=>{console.log("SOMETHING WENT WRONG HERE (62)")})
              }).catch((e)=>{console.log("SOMETHING WENT WRONG HERE (63)")})
            }catch{  }
            //destroy
            player.destroy();
          }
        } catch {
          /* */ }
      })
      client.on("voiceStateUpdate", async (oldState, newState) => {
        if(newState.id === client.user.id && oldState.serverDeaf === true && newState.serverDeaf === false)
            {
                try{
                    var channel = newState.member.guild.channels.cache.find(
                        channel =>
                          channel.type === "text" &&
                          ( channel.name.toLowerCase().includes("cmd") ||channel.name.toLowerCase().includes("command") ||  channel.toLowerCase().name.includes("bot") ) &&
                          channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
                      );
                      channel.send("Don't unmute me!, i muted my self again! This safes Data so it gives you a faster and smoother experience")
                      newState.setDeaf(true);
                }catch (error) {
                    try{
                        console.log("could not send info msg in a botchat")
                        var channel = newState.member.guild.channels.cache.find(
                            channel =>
                              channel.type === "text" &&
                              channel.permissionsFor(newState.member.guild.me).has("SEND_MESSAGES")
                          );
                          channel.send("Don't unmute me!, i muted my self again! This safes Data so it gives you a faster and smoother experience")
                          newState.setDeaf(true);
                    }catch (error) {
                      console.log("could not send info msg in a random chat")
                      newState.setDeaf(true);
                    }
                }
        }
        // LEFT V12
        if (oldState.channelID && !newState.channelID) {
          //if bot left
          try {
            if (oldState.member.user.id === client.user.id) {
              var player = client.manager.players.get(oldState.guild.id);
              if (!player) return;
              //edit the current song message
              try{
                client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                  msg.edit({content: `Song has ended!`, embed: msg.embeds[1], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                    new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                    new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                    new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
                  ]}).catch((e)=>{console.log(e)})
                }).catch((e)=>{console.log(e)})
              }catch{  }
              //destroy
              player.destroy();
            }
          } catch {}
        }
        var player = client.manager.players.get(newState.guild.id);
        if (!player) return;
        databasing(client, player.guild, player.get("playerauthor"));
        if (oldState && oldState.channel) {
          player = client.manager.players.get(oldState.guild.id);
          //if not connect return player.destroy()
          if (!oldState.guild.me.voice.channel){
            //edit the current song message
            try{
              client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                  new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                  new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                  new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
                ]}).catch((e)=>{console.log("SOMETHING WENT WRONG HERE (135)")})
              }).catch((e)=>{console.log("SOMETHING WENT WRONG HERE (136)")})
            }catch{  }
            return player.destroy();
          }
          //wait some time...
          if (player && oldState.guild.channels.cache.get(player.voiceChannel).members.size === 1) {
          try {
            player = client.manager.players.get(oldState.guild.id);
            //if not connect return player.destroy()
            if (!oldState.guild.me.voice.channel && player) {
              //edit the current song message
              try{
                client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                  msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                    new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                    new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                    new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
                  ]}).catch((e)=>{console.log("SOMETHING WENT WRONG HERE (153)")})
                }).catch((e)=>{console.log("SOMETHING WENT WRONG HERE (154)")})
              }catch{  }
              return player.destroy();
            }
            //wait some time...
            var vc = oldState.guild.channels.cache.get(player.voiceChannel)
            if (player && vc && vc.members.size === 1) {
              //if afk is enbaled return and not destroy the PLAYER
              if (player.get(`afk`)){
                try{
                  client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                    msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                      new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                      new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                      new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
                    ]}).catch((e)=>{console.log("SOMETHING WENT WRONG HERE (169)")})
                  }).catch((e)=>{console.log("SOMETHING WENT WRONG HERE (170)")})
                }catch{

                }
                return 
              }
              
              //send the embed
              try{
                var embed = new MessageEmbed()
                  .setTitle(`<:no:833101993668771842> Queue has ended | Channel Empty`)
                  .setDescription(`I left the Channel: ${client.channels.cache.get(player.voiceChannel).name} because the Channel got empty`)
                  .setColor(ee.wrongcolor);
                client.channels.cache.get(player.textChannel).send(embed).catch((e)=>{})
              }catch{}
              
              //edit the current song message
              try{
                const fuckedupchannel = client.channels.cache.get(player.textChannel);
                if(!fuckedupchannel) return console.log("cannot find channel (common discord bug)")
                fuckedupchannel.messages.fetch(player.get("currentmsg")).then(msg => {
                  msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                    new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                    new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                    new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
                  ]}).catch((e)=>{console.log("SOMETHING WENT WRONG HERE (193)")})
                }).catch((e)=>{console.log("SOMETHING WENT WRONG HERE (194)")})
              }catch{  }
              player.destroy();
            }
          } catch (e) {
            console.log("SOMETHING WENT WRONG HERE (200)");
          }
          }
        }
      });
  };