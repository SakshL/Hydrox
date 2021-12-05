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

//function for playling song
async function song(client, message, args, type, extras) {
  var search = args.join(" ");
    var res;
    var player = client.manager.players.get(message.guild.id);
    //if no node, connect it 
    if(player && player.node && !player.node.connected) await player.node.connect()
    //if no player create it
    if(!player){
      if(!message.member.voice.channel) throw "NOT IN A VC"
      player = await client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
        selfDeafen: true,
      });
      if(player && player.node && !player.node.connected) await player.node.connect()
      player.set("messageid", message.id);
    }
    let state = player.state;
    if (state !== "CONNECTED") { 
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      message.react("<a:yes:880128360456531998>").catch(e => console.log(e));
      player.stop();
    }
    try {
      // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
      if (type.split(":")[1] === "youtube" || type.split(":")[1] === "soundcloud")
        res = await client.manager.search({
          query: search,
          source: type.split(":")[1]
        }, message.author);
      else {
        res = await client.manager.search(search, message.author);
      }
      // Check the load type as this command is not that advanced for basics
      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED") {
        playlist_()
      } else {
        song_()
      }
    } catch (e) {
      console.log(e)
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(`❌ Error | There was an error while searching:`)
        .setDescription(`\`\`\`${e.message}\`\`\``)
      );
    }
    
    async function song_() {
      if (!res.tracks[0])
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
          .setDescription(`Please retry!`)
        );
     //if the player is not connected, then connect and create things
    if (player.state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      //connect
      player.connect();
      message.react("863876115584385074").catch(e => console.log("Couldn't delete message this is a catch to prevent a crash"));
      //add track
      player.queue.add(res.tracks[0]);
      //play track
      player.play();
      player.pause(false);
    }
    else if(!player.queue || !player.queue.current){
      //add track
      player.queue.add(res.tracks[0]);
      //play track
      player.play();
      player.pause(false);
    }
    else {
      //add the latest track
      player.queue.add(res.tracks[0]);
      //send track information
      var playembed = new MessageEmbed()
        .setDescription(`:thumbsup: **Queued :notes: [${res.tracks[0].title}](${res.tracks[0].uri})**`)
        .setColor(ee.color)
        .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
        .addField("⌛ Duration: ", `\`${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration)}\``, true)
        .addField("💯 Song By: ", `\`${res.tracks[0].author}\``, true)
        .addField("🔂 Queue length: ", `\`${player.queue.length} Songs\``, true)
      return message.channel.send(playembed)
    }
    }
    //function ffor playist
    async function playlist_() {
      if (!res.tracks[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        
        .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(`Please retry!`)
      );
    //if the player is not connected, then connect and create things
    if (player.state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      message.react("863876115584385074").catch(e => console.log("Couldn't delete message this is a catch to prevent a crash"));
      var firsttrack = res.tracks[0]
      //add track
      if(extras && extras === "songoftheday"){
        console.log("LOL")
        player.queue.add(res.tracks.slice(1, res.tracks.length - 1));
        player.queue.add(firsttrack);
      }else {
        player.queue.add(res.tracks);
      }
    }
    else if(!player.queue || !player.queue.current){
      var firsttrack = res.tracks[0]
      //add track
      if(extras && extras === "songoftheday"){
        console.log("LOL")
        player.queue.add(res.tracks.slice(1, res.tracks.length - 1));
        player.queue.add(firsttrack);
      }else {
        player.queue.add(res.tracks);
      }
      //play track
      player.play();
      player.pause(false);
    }
    else {
      //add the tracks
      player.queue.add(res.tracks);
    }
    //send information
    var playlistembed = new MessageEmbed()
        .setTitle(`Added Playlist 🩸 **\`${res.playlist.name}`.substr(0, 256 - 3) + "`**")
        .setURL(res.playlist.uri).setColor(ee.color)
        .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
        .addField("⌛ Duration: ", `\`${format(res.playlist.duration)}\``, true)
        .addField("🔂 Queue length: ", `\`${player.queue.length} Songs\``, true)
        .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({
          dynamic: true
        }))
      message.channel.send(playlistembed)
    }

}

module.exports = song;

/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 *///console.log
