var {
  MessageEmbed
} = require("discord.js")
var ee = require("../../botconfig/embed.json")
var config = require("../../botconfig/config.json")
var {
  format,
  delay,
  arrayMove
} = require("../functions")

//function for searching songs
async function search(client, message, args, type) {
  var search = args.join(" ");
  try {
    var res;
    var player = client.manager.players.get(message.guild.id);
    //if no node, connect it 
    if(player && player.node && !player.node.connected) await player.node.connect()
    //if no player create it
    if(!player){
      player = await client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: true,
      });
      if(player && player.node && !player.node.connected) await player.node.connect()
    }
    let state = player.state;
    if (state !== "CONNECTED") { 
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      message.react("<a:yes:875354102010347540>").catch(e => console.log("Couldn't delete message this is a catch to prevent a crash muji"));
      player.stop();
    }
    try {
      // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
      res = await client.manager.search({
        query: search,
        source: type.split(":")[1]
      }, message.author);
      // Check the load type as this command is not that advanced for basics
      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED") throw {
        message: "Playlists are not supported with this command. Use   ?playlist  "
      };
    } catch (e) {
      console.log(e)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(`❌ Error | There was an error while searching:`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      ).catch((e)=>{});
    }


    var max = 10,
      collected, filter = (r, u) => u.id === message.author.id;
    if (res.tracks.length < max) max = res.tracks.length;
    track = res.tracks[0]
    var theresults = res.tracks
    .slice(0, max)
    var results = theresults.map((track, index) => `**${++index})** [\`${String(track.title).substr(0, 60).split("[").join("{").split("]").join("}")}\`](${track.uri}) - \`${format(track.duration).split(" | ")[0]}\``)
      .join('\n');

    let toreact = await message.channel.send(new MessageEmbed()
      .setTitle(`Search-Result for: 🔎 **\`${search}`.substr(0, 256 - 3) + "`**")
      .setColor(ee.color)
      .setDescription(results)
      .setFooter(`Search-Request by: ${track.requester.tag}`, track.requester.displayAvatarURL({
        dynamic: true
      }))
    ).catch((e)=>{});
    const emojiarray = ["❌", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]
    for(let i = 0; i < emojiarray.length; i++){
      try{
        if(i == max+1) break;
        toreact.react(emojiarray[i])
      }catch{}
    }

    try {
      collected = await toreact.awaitReactions(filter, {
        max: 1,
        time: 30e3,
        errors: ['time']
      });
    } catch (e) {
      if (!player.queue.current) player.destroy();
      toreact.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
      return message.channel.send(new MessageEmbed()
        .setTitle("❌ Error | You didn't provide a selection")
        .setColor(ee.wrongcolor)
      ).catch((e)=>{});
    }
    var first = collected.first().emoji.name;
    if (first === '❌') {
      if (!player.queue.current) player.destroy();
      toreact.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle('❌ Error | Cancelled selection.')
      ).catch((e)=>{});
    }

    toreact.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
    
    var index = emojiarray.findIndex(emoji => emoji == first) - 1;
    
    var pickedresults = theresults.map((track, ii) => `${index == ii ? "" : "~~"}**${++ii})** [\`${String(track.title).substr(0, 60).split("[").join("{").split("]").join("}")}\`](${track.uri}) - \`${format(track.duration).split(" | ")[0]}\`${index == ii ? "" : "~~"}`)
    .join('\n');

    toreact.edit({embed: new MessageEmbed()
      .setTitle(`Search-Result-PICKED for: 🔎 **\`${search}`.substr(0, 256 - 3) + "`**")
      .setColor(ee.color)
      .setDescription(pickedresults)
      .setFooter(`Search-Request by: ${track.requester.tag}`, track.requester.displayAvatarURL({
        dynamic: true
      }))})

    track = res.tracks[index];

    if (player.state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      message.react("<a:yes:875354102010347540>").catch(e => console.log("Couldn't delete message this is a catch to prevent a crash hya"));
      //add track
      player.queue.add(track);
      //set the variables
      //play track
      player.play();
      player.pause(false);

    } 
    else if(!player.queue || !player.queue.current){
      //add track
      player.queue.add(track);
      //play track
      player.play();
      player.pause(false);
    }
    else {
      player.queue.add(track);
      var embed3 = new MessageEmbed()
        .setDescription(`:thumbsup: **Queued :notes: [${track.title}](${track.uri})**`)
        .setColor(ee.color)
        .setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
        .addField("⌛ Duration: ", `\`${track.isStream ? "LIVE STREAM" : format(track.duration)}\``, true)
        .addField("💯 Song By: ", `\`${track.author}\``, true)
        .addField("🔂 Queue length: ", `\`${player.queue.length} Songs\``, true)
      return message.channel.send(embed3).catch((e)=>{});
    }

  } catch (e) {
    console.log(e)
    message.channel.send(new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
    ).catch((e)=>{});
  }
}

module.exports = search;
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 *///console.log
