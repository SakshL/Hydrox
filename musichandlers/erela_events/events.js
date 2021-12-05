var {
      MessageEmbed
    } = require("discord.js"),
    ms = require("ms"),

    config = require("../../botconfig/config.json"),
    emoji = require("../../botconfig/emojis.json"),
    ee = require("../../botconfig/embed.json"),
  
    {
      createBar,
      format,
      databasing,
      autoplay
    } = require("../../musichandlers/functions"),
    playermanager = require("../../musichandlers/playermanager"),
  
    playercreated = new Map();
    var mi;
    const { MessageButton, MessageActionRow } = require('discord-buttons')
  module.exports = (client) => {
      client.manager
        .on("playerCreate", async (player) => {
          playercreated.set(player.guild)
        })
        .on("playerMove", async (player, oldChannel, newChannel) => {
          if (!newChannel) {
            try {
              client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                  new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                  new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                  new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
                ]}).catch((e)=>{console.log(e)})
              }).catch((e)=>{console.log(e)})
            } catch (e) {
              console.log(e);
            }
            player.destroy();
          } else {
            player.voiceChannel = newChannel;
            if (player.paused) return;
            setTimeout(() => {
              player.pause(true);
              setTimeout(() => player.pause(false), client.ws.ping * 2);
            }, client.ws.ping * 2);
          }
        })
        .on("trackStart", async (player, track) => {
          try {
            if(playercreated.has(player.guild)){
              player.set("eq", "💣 None");
              player.set("filter", "🧨 None");
              client.settings.ensure(player.guild, {
                defaultvolume: 15,
                defaulteq: false,
                defaultap: true,
                playmsg: true,
              });
              await player.setVolume(client.settings.get(player.guild, "defaultvolume"))
              await player.set("autoplay", client.settings.get(player.guild, "defaultap"));
              await player.set(`afk`, false)
              if(client.settings.get(player.guild, "defaulteq")){
                await player.setEQ(client.eqs.music);
              }
              databasing(client, player.guild, player.get("playerauthor"));
              playercreated.delete(player.guild); // delete the playercreated state from the thing
            }
            //votes for skip --> 0
            player.set("votes", "0");
            //set the vote of every user to FALSE so if they voteskip it will vote skip and not remove voteskip if they have voted before bruh
            for (var userid of client.guilds.cache.get(player.guild).members.cache.map(member => member.user.id))
              player.set(`vote-${userid}`, false);
            //set the previous track just have idk where its used ^-^
            player.set("previoustrack", track);
            //if that's disabled return
            if(!client.settings.get(player.guild, "playmsg")){
              return;
            }
            // playANewTrack(client,player,track);
            var embed = new MessageEmbed().setColor(ee.color)
              embed.setAuthor(`${track.title}`, "https://images-ext-1.discordapp.net/external/DkPCBVBHBDJC8xHHCF2G7-rJXnTwj_qs78udThL8Cy0/%3Fv%3D1/https/cdn.discordapp.com/emojis/859459305152708630.gif", track.uri)
              embed.setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
              embed.setFooter(`Requested by: ${track.requester.tag}`, track.requester.displayAvatarURL({dynamic: true}));
            let skip = new MessageButton().setStyle('blurple').setID('1').setEmoji("⏭").setLabel("Skip")
            let stop = new MessageButton().setStyle('red').setID('2').setEmoji("🏠").setLabel("Stop")
            let pause = new MessageButton().setStyle('red').setID('3').setEmoji('⏸').setLabel("Pause")
            let autoplay = new MessageButton().setStyle('green').setID('4').setEmoji('🔁').setLabel("Autoplay")
            
            if(!player.playing){
              pause = new MessageButton().setStyle('green').setID('3').setEmoji('▶️').setLabel("Resume")
            }
            if(player.get("autoplay")){
              autoplay = new MessageButton().setStyle('red').setID('4').setEmoji('🔁').setLabel("Autoplay")
            }
            const allbuttons = [skip, stop, pause, autoplay]
            //Send message with buttons
            let swapmsg = await client.channels.cache.get(player.textChannel).send({
                embed: embed, 
                buttons: allbuttons
            }).then(msg => {
              player.set("currentmsg", msg.id);
              return msg;
            })
            //create a collector for the thinggy
            const collector = swapmsg.createButtonCollector(button => !button.clicker.user.bot, { time: track.duration > 0 ? track.duration : 600000 }); //collector for 5 seconds
            //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
            collector.on('collect', async b => {
                //skip
                if(b.id == "1") {
                  let member = await b.guild.members.fetch(b.clicker.user)
                  //get the channel instance from the Member
                  const channel = member?.voice?.channel;
                  //if the member is not in a channel, return
                  if (!channel)
                    return b.reply.send(":x: You must be in my VC", true)
                  //get the player instance
                  const player = client.manager.players.get(b.guild.id);
                  //if no player available return aka not playing anything
                  if (!player){
                    if(b.guild.me.voice.channel) {
                      b.reply.send("Stopped", true)
                      b.guild.me.voice.channel.leave().catch(e => console.log(e))
                      return 
                    }
                    else {
                      return b.reply.send(":x: Nothing Playing yet", true)
                    }
                    return
                  }
                  //if not in the same channel as the player, return Error
                  if (channel.id !== player.voiceChannel)
                    return b.reply.send(":x: You must be in my VC", true)
                  //if ther is nothing more to skip then stop music and leave the Channel
                  if (player.queue.size == 0) {
                    //if its on autoplay mode, then do autoplay before leaving...
                    if(player.get("autoplay")) return autoplay(client, player, "skip");
                    if(b.guild.me.voice.channel) {
                      b.guild.me.voice.channel.leave().cache(e => 
                        console.log(e)
                      )
                      b.reply.send("Stopped", true) 
                      edited = true;

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
                      player.destroy()
                    }
                    else {
                      b.reply.send("Stopped", true)
                      edited = true;
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
                      player.destroy()
                    }
                    return
                  }
                  //skip the track
                  player.stop();
                  return b.reply.send("⏭ Skipped to the next Song", true) 
                }
                //stop
                if(b.id == "2") {
                  let member = await b.guild.members.fetch(b.clicker.user)
                  //get the channel instance from the Member
                  const channel = member?.voice?.channel;
                  //if the member is not in a channel, return
                  if (!channel)
                    return b.reply.send(":x: You must be in my VC", true)
                  //get the player instance
                  const player = client.manager.players.get(b.guild.id);
                  //if no player available return aka not playing anything
                  if (!player){
                    return b.reply.send(":x: Nothing Playing yet", true)
                  }
                  //if not in the same channel as the player, return Error
                  if (channel.id !== player.voiceChannel)
                    return b.reply.send(":x: You must be in my VC", true)
                  //if ther is nothing more to skip then stop music and leave the Channel
                  if (player.queue.size == 0) {
                    b.reply.send("Stopped", true)
                    edited = true;
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
                    player.destroy()
                  } else {
                    //skip the track
                    b.reply.send("Stopped", true) 
                    edited = true;
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
                    player.destroy()
                  }
                }
                //pause/resume
                if(b.id == "3") {
                  let member = await b.guild.members.fetch(b.clicker.user)
                  //get the channel instance from the Member
                  const channel = member?.voice?.channel;
                  //if the member is not in a channel, return
                  if (!channel)
                    return b.reply.send(":x: You must be in my VC", true)
                  //get the player instance
                  const player = client.manager.players.get(b.guild.id);
                  //if no player available return aka not playing anything
                  if (!player){
                    return b.reply.send(":x: Nothing Playing yet", true)
                  }
                  //if not in the same channel as the player, return Error
                  if (channel.id !== player.voiceChannel)
                    return b.reply.send(":x: You must be in my VC", true)
                  if (!player.playing){
                    player.pause(false);
                    swapmsg.edit({
                      embed: embed, 
                      buttons: [skip, stop, pause.setStyle('red').setEmoji('⏸').setLabel("Pause"), autoplay] 
                    })
                    b.reply.send("Resumed!", true)
                  }else{
                    //pause the player
                    player.pause(true);
                    swapmsg.edit({
                      embed: embed, 
                      buttons: [skip, stop, pause.setStyle('green').setEmoji('▶️').setLabel("Resume"), autoplay]
                    })
                    b.reply.send("Paused!", true)
                  }
                }
                //autoplay
                if(b.id == "4") {
                  let member = await b.guild.members.fetch(b.clicker.user)
                  //get the channel instance from the Member
                  const channel = member?.voice?.channel;
                  //if the member is not in a channel, return
                  if (!channel)
                    return b.reply.send(":x: You must be in my VC", true)
                  //get the player instance
                  const player = client.manager.players.get(b.guild.id);
                  //if no player available return aka not playing anything
                  if (!player){
                    return b.reply.send(":x: Nothing Playing yet", true)
                  }
                  //if not in the same channel as the player, return Error
                  if (channel.id !== player.voiceChannel)
                    return b.reply.send(":x: You must be in my VC", true)
                  //pause the player
                  player.set(`autoplay`, !player.get(`autoplay`))
                  if(player.get(`autoplay`)){
                    swapmsg.edit({
                      embed: embed, 
                      buttons: [skip, stop, pause, autoplay.setStyle('red')]
                    })
                  }
                  else {
                    swapmsg.edit({
                      embed: embed, 
                      buttons: [skip, stop, pause, autoplay.setStyle('green')]
                    })
                  }
                  //Send Success Message
                  b.reply.send(`${player.get(`autoplay`) ? `Enabled` : `Disabled`} the Autoplay feature`, true)
                }
            });
            collector.on('end', collected => {
              edited = true;
              swapmsg.edit({content: `Song has ended!`, embed: swapmsg.embeds[0], buttons: [skip.setStyle('grey').setDisabled(true), stop.setStyle('grey').setDisabled(true), pause.setStyle('grey').setDisabled(true), autoplay.setStyle('grey').setDisabled(true)]})
            });
            setTimeout(()=>{
              if(!edited)
              swapmsg.edit({content: `Song has ended!`, embed: swapmsg.embeds[0], buttons: [skip.setStyle('grey').setDisabled(true), stop.setStyle('grey').setDisabled(true), pause.setStyle('grey').setDisabled(true), autoplay.setStyle('grey').setDisabled(true)]})
            }, track.duration > 0 ? track.duration : 600000 + 150)
          
          } catch (e) {
            console.log(e) /* */
          }
        })
        .on("trackStuck", (player, track, payload) => {
          player.stop();
        })
        .on("trackError", (player, track, payload) => {
          player.stop();  
        })
        .on("queueEnd", async (player) => {
          // "uncomment" to enable trackEnd also for one song long Queus
          // client.manager.emit("trackEnd", player, track)
          databasing(client, player.guild, player.get("playerauthor"));
          if (player.get("autoplay")) return autoplay(client, player);
          //DEvar TIME OUT
          try {
            player = client.manager.players.get(player.guild);
            if (!player.queue || !player.queue.current) {
              //if afk is enbaled return and not destroy the PLAYER
              if (player.get(`afk`)){
                try{
                  client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                    msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                      new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                      new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                      new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
                    ]}).catch((e)=>{console.log(e)})
                  }).catch((e)=>{console.log(e)})
                }catch{

                }
                return 
              }
              try{
                client.channels.cache.get(player.textChannel).messages.fetch(player.get("currentmsg")).then(msg => {
                  msg.edit({content: `Song has ended!`, embed: msg.embeds[0], buttons: [new MessageButton().setID('1').setEmoji("⏭").setLabel("Skip").setStyle('grey').setDisabled(true), 
                    new MessageButton().setID('2').setEmoji("🏠").setLabel("Stop").setStyle('grey').setDisabled(true), 
                    new MessageButton().setID('3').setEmoji('⏸').setLabel("Pause").setStyle('grey').setDisabled(true),
                    new MessageButton().setID('4').setEmoji('🔁').setLabel("Autoplay").setStyle('grey').setDisabled(true)
                  ]}).catch((e)=>{console.log(e)})
                }).catch((e)=>{console.log(e)})
              }catch{

              }
              player.destroy();
            }
          } catch (e) {
            console.log(e);
          }
        });
  };
  /**
   * @INFO
   * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
   * @INFO
   * Work for Milrato Development | https://milrato.eu
   * @INFO
   * Please mention Him / Milrato Development, when using this Code!
   * @INFO
   */
  