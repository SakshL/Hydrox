
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

module.exports = playtop;
async function playtop(client, message, args, type) {
  const search = args.join(" ");
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
    player.set("messageid", message.id);
  }
  let state = player.state;
  if (state !== "CONNECTED") { 
    //set the variables
    player.set("message", message);
    player.set("playerauthor", message.author.id);
    player.connect();
    message.react("<a:yes:875354102010347540>").catch(e => console.log("Couldn't delete message this is a catch to prevent a crash--"));
    player.stop();
  }
  let res;
      res = await client.manager.search({
        query: search,
        source: type.split(":")[1]
      }, message.author);
    // Check the load type as this command is not that advanced for basics
    if (res.loadType === "LOAD_FAILED") throw res.exception;
    else if (res.loadType === "PLAYLIST_LOADED") {
      playlist_()
    } else {
      song_()
    }
  async function song_() {
    //if no tracks found return info msg

    if (!res.tracks[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(`Please retry!`)
      ).catch((e)=>{});
    //if the player is not connected, then connect and create things
    if (state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("messageid", message.id);
      player.set("playerauthor", message.author.id);
      //connect
      player.connect();
      message.react("<a:yes:875354102010347540>").catch(e => console.log("Couldn't delete message this is a catch to prevent a crash="));
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
    //otherwise
    else {
     //save old tracks on an var
      let oldQueue =[]
      for(const track of player.queue)
        oldQueue.push(track);
      //clear queue
      player.queue.clear();
      //add new tracks
      player.queue.add(res.tracks[0]);
      //now add every old song again
      for (const track of oldQueue)
        player.queue.add(track);
      }
      //send track information
      var playembed = new MessageEmbed() 
      .setDescription(`:thumbsup: **Queued :notes: [${res.tracks[0].title}](${res.tracks[0].uri})**`)
      .setColor(ee.color)
      .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
      .addField("⌛ Duration: ", `\`${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration)}\``, true)
      .addField("💯 Song By: ", `\`${res.tracks[0].author}\``, true)
      .addField("🔂 Queue length: ", `\`${player.queue.length} Songs\``, true)
   
      return message.channel.send(playembed).catch((e)=> {console.log(e)});
  }
  //function ffor playist
  async function playlist_() {

    if (!res.tracks[0])
      return message.channel.send(new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
        .setDescription(`Please retry!`)
      ).catch((e)=>{});
    //if the player is not connected, then connect and create things
    if (state !== "CONNECTED") {
      
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      //add track
      player.queue.add(res.tracks);
      //play track
      player.play();
    }
    else if(!player.queue || !player.queue.current){
      //add track
      player.queue.add(res.tracks);
      //play track
      player.play();
    }else{
      //save old tracks on an var
      let oldQueue =[]
      for(const track of player.queue)
        oldQueue.push(track);
      //clear queue
      player.queue.clear();
      //add new tracks
      player.queue.add(res.tracks);
      //now add every old song again
      for (const track of oldQueue)
        player.queue.add(track);
    }
    var time = 0;
      let playlistembed = new Discord.MessageEmbed()

        .setAuthor(`Playlist added to Queue`, message.author.displayAvatarURL({dynamic:true}), "https://milrato.eu" )
        .setColor(ee.color)
        .setTitle("**"+res.playlist.name+"**")
        .setThumbnail(`https://img.youtube.com/vi/${res.tracks[0].identifier}/mqdefault.jpg`)
          //timing for estimated time creation
          if(player.queue.size > 0) player.queue.map((track) => time += track.duration)
          time += player.queue.current.duration - player.position;
          for(const track of res.tracks)
            time -= track.duration;
  
          playlistembed.addField("Estimated time until playing", time > 10 ? format(time).split(" | ")[0] : "NOW")
          .addField("Position in queue", `${player.queue.length - res.tracks.length + 1 === 0 ? "NOW" : player.queue.length - res.tracks.length + 1}`, true)
          .addField("Enqueued", `\`${res.tracks.length}\``, true)
          //if bot allowed to send embed, do it otherwise pure txt msg
          if(message.guild.me.permissionsIn(message.channel).has("EMBED_LINKS"))
            message.channel.send(playlistembed).catch((e)=>{});
          else
            message.channel.send(`Added: \`${res.tracks[0].title}\` - to the Queue\n**Channel:** ${res.tracks[0].author}\n**Song Duration:** ${res.tracks[0].isStream ? "LIVE STREAM" : format(res.tracks[0].duration).split(" | ")[0]}\n**Estimated time until playing:** ${time}\n**Position in queue:** ${player.queue.length}\n${res.tracks[0].uri}`).catch((e)=>{});
  }
}