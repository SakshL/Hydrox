const Discord = require("discord.js");
const {
  MessageEmbed
} = require("discord.js");
const emoji = require("../botconfig/emojis.json");
const config = require("../botconfig/config.json");
const ee = require("../botconfig/embed.json");
const radios = require("../botconfig/radiostations.json");
const ms = require("ms")

/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention Him / Milrato Development, when using this Code!
 * @INFO
 */

 module.exports.getMember = getMember 
 module.exports.shuffle = shuffle;
 module.exports.formatDate = formatDate;
 module.exports.duration = duration;
 module.exports.promptMessage = promptMessage;
 module.exports.delay = delay;
 module.exports.getRandomInt = getRandomInt;
 module.exports.getRandomNum = getRandomNum;
 module.exports.createBar = createBar;
 module.exports.format = format;
 module.exports.stations = stations;
 module.exports.databasing = databasing;
 module.exports.escapeRegex = escapeRegex;
 module.exports.autoplay = autoplay;
 module.exports.arrayMove = arrayMove;
 module.exports.swap_pages = swap_pages;
 module.exports.swap_pages2 = swap_pages2


function getMember(message, toFind = "") {
  try {
    toFind = toFind.toLowerCase();
    let target = message.guild.members.get(toFind);
    if (!target && message.mentions.members) target = message.mentions.members.first();
    if (!target && toFind) {
      target = message.guild.members.find((member) => {
        return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
      });
    }
    if (!target) target = message.member;
    return target;
  } catch (e) {
    console.log(e)
  }
}

function shuffle(a) {
  try {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  } catch (e) {
    console.log(e)
  }
}

function formatDate(date) {
  try {
    return new Intl.DateTimeFormat("en-US").format(date);
  } catch (e) {
    console.log(e)
  }
}

function parseDuration(duration) {
  let remain = duration
  let days = Math.floor(remain / (1000 * 60 * 60 * 24))
  remain = remain % (1000 * 60 * 60 * 24)

  let hours = Math.floor(remain / (1000 * 60 * 60))
  remain = remain % (1000 * 60 * 60)

  let minutes = Math.floor(remain / (1000 * 60))
  remain = remain % (1000 * 60)

  let seconds = Math.floor(remain / (1000))
  remain = remain % (1000)

  let milliseconds = remain

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}

function formatTime(o, useMilli = false) {
  let parts = []
  if (o.days) {
    let ret = o.days + ' Day'
    if (o.days !== 1) {
      ret += 's'
    }
    parts.push(ret)
  }
  if (o.hours) {
    let ret = o.hours + ' Hr'
    if (o.hours !== 1) {
      ret += 's'
    }
    parts.push(ret)
  }
  if (o.minutes) {
    let ret = o.minutes + ' Min'
    if (o.minutes !== 1) {
      ret += 's'
    }
    parts.push(ret)

  }
  if (o.seconds) {
    let ret = o.seconds + ' Sec'
    if (o.seconds !== 1) {
      ret += 's'
    }
    parts.push(ret)
  }
  if (useMilli && o.milliseconds) {
    let ret = o.milliseconds + ' ms'
    parts.push(ret)
  }
  if (parts.length === 0) {
    return 'instantly'
  } else {
    return parts
  }
}


function duration(duration, useMilli = false) {
  let time = parseDuration(duration)
  return formatTime(time, useMilli)
}


function delay(delayInms) {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  } catch (e) {
    console.log(e)
  }
}

//randomnumber between 0 and x
function getRandomInt(max) {
  try {
    return Math.floor(Math.random() * Math.floor(max));
  } catch (e) {
    console.log(e)
  }
}
//random number between y and x
function getRandomNum(min, max) {
  try {
    return Math.floor(Math.random() * Math.floor((max - min) + min));
  } catch (e) {
    console.log(e)
  }
}

function createBar(player) {
    let size = 25;
    let line = "▬";
    //player.queue.current.duration == 0 ? player.position : player.queue.current.duration, player.position, 25, "▬", "🔷")
    if (!player.queue.current) return `**[${"🔷"}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
    let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
    let total = player.queue.current.duration;

    let slider = "🔷";
    let bar = current > total ? [line.repeat(size / 2 * 2), (current / total) * 100] : [line.repeat(Math.round(size / 2 * (current / total))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (current / total)) + 1), current / total];
    if (!String(bar).includes("🔷")) return `**[${"🔷"}${line.repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`;
    return `**[${bar[0]}]**\n**${new Date(player.position).toISOString().substr(11, 8)+" / "+(player.queue.current.duration==0?" ◉ LIVE":new Date(player.queue.current.duration).toISOString().substr(11, 8))}**`;
}
function format(millis) {
  try {
    var h = Math.floor(millis / 3600000),
      m = Math.floor(millis / 60000),
      s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Sec";
    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Sec";
  } catch (e) { 
    console.log(e)
  }
}
function stations(client, prefix, message) {
  try {
    let amount = 0;
    const stationsembed = new Discord.MessageEmbed().setColor(ee.color).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 11`");
    const stationsembed2 = new Discord.MessageEmbed().setColor(ee.color).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 69`");
    const stationsembed3 = new Discord.MessageEmbed().setColor(ee.color).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 180`");
    let United_Kingdom = "";
    for (let i = 0; i < radios.EU.United_Kingdom.length; i++) {
      United_Kingdom += `**${i + 1 + 10 * amount}**[${radios.EU.United_Kingdom[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.United_Kingdom[i].split(" ")[1]})\n`;
    }
    stationsembed.addField("🇬🇧 United Kingdom", `>>> ${United_Kingdom}`, true);
    amount++;
    let austria = "";
    for (let i = 0; i < radios.EU.Austria.length; i++) {
      austria += `**${i + 1 + 10 * amount}**[${radios.EU.Austria[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Austria[i].split(" ")[1]})\n`;
    }
    stationsembed.addField("🇦🇹 Austria", `>>> ${austria}`, true);
    amount++;
    let Belgium = "";
    for (let i = 0; i < radios.EU.Belgium.length; i++) {
      Belgium += `**${i + 1 + 10 * amount}**[${radios.EU.Belgium[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Belgium[i].split(" ")[1]})\n`;
    }
    stationsembed.addField("🇧🇪 Belgium", `>>> ${Belgium}`, true);
    amount++;
    let Bosnia = "";
    for (let i = 0; i < radios.EU.Bosnia.length; i++) {
      Bosnia += `**${i + 1 + 10 * amount}**[${radios.EU.Bosnia[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Bosnia[i].split(" ")[1]})\n`;
    }
    stationsembed.addField("🇧🇦 Bosnia", `>>> ${Bosnia}`, true);
    amount++;
    let Czech = "";
    for (let i = 0; i < radios.EU.Czech.length; i++) {
      Czech += `**${i + 1 + 10 * amount}**[${radios.EU.Czech[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Czech[i].split(" ")[1]})\n`;
    }
    stationsembed.addField("🇨🇿 Czech", `>>> ${Czech}`, true);
    amount++;
    let Denmark = "";
    for (let i = 0; i < radios.EU.Denmark.length; i++) {
      Denmark += `**${i + 1 + 10 * amount}**[${radios.EU.Denmark[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Denmark[i].split(" ")[1]})\n`;
    }
    stationsembed.addField("🇩🇰 Denmark", `>>> ${Denmark}`, true);
    amount++;
    let germany = "";
    for (let i = 0; i < radios.EU.Germany.length; i++) {
      germany += `**${i + 1 + 10 * amount}**[${radios.EU.Germany[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Germany[i].split(" ")[1]})\n`;
    }
    stationsembed2.addField("🇩🇪 Germany", `>>> ${germany}`, true);
    amount++;
    let Hungary = "";
    for (let i = 0; i < radios.EU.Hungary.length; i++) {
      Hungary += `**${i + 1 + 10 * amount}**[${radios.EU.Hungary[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Hungary[i].split(" ")[1]})\n`;
    }
    stationsembed2.addField("🇭🇺 Hungary", `>>> ${Hungary}`, true);
    amount++;
    let Ireland = "";
    for (let i = 0; i < radios.EU.Ireland.length; i++) {
      Ireland += `**${i + 1 + 10 * amount}**[${radios.EU.Ireland[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Ireland[i].split(" ")[1]})\n`;
    }
    stationsembed2.addField("🇮🇪 Ireland", `>>> ${Ireland}`, true);
    amount++;
    let Italy = "";
    for (let i = 0; i < radios.EU.Italy.length; i++) {
      Italy += `**${i + 1 + 10 * amount}**[${radios.EU.Italy[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Italy[i].split(" ")[1]})\n`;
    }
    stationsembed2.addField("🇮🇹 Italy", `>>> ${Italy}`, true);
    amount++;
    let Luxembourg = "";
    for (let i = 0; i < radios.EU.Luxembourg.length; i++) {
      Luxembourg += `**${i + 1 + 10 * amount}**[${radios.EU.Luxembourg[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Luxembourg[i].split(" ")[1]})\n`;
    }
    stationsembed2.addField("🇱🇺 Luxembourg", `>>> ${Luxembourg}`, true);
    amount++;
    let Romania = "";
    for (let i = 0; i < radios.EU.Romania.length; i++) {
      Romania += `**${i + 1 + 10 * amount}**[${radios.EU.Romania[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Romania[i].split(" ")[1]})\n`;
    }
    stationsembed2.addField("🇷🇴 Romania", `>>> ${Romania}`, true);
    amount++;
    let Serbia = "";
    for (let i = 0; i < radios.EU.Serbia.length; i++) {
      Serbia += `**${i + 1 + 10 * amount}**[${radios.EU.Serbia[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Serbia[i].split(" ")[1]})\n`;
    }
    stationsembed3.addField("🇷🇸 Serbia", `>>> ${Serbia}`, true);
    amount++;
    let Spain = "";
    for (let i = 0; i < radios.EU.Spain.length; i++) {
      Spain += `**${i + 1 + 10 * amount}**[${radios.EU.Spain[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Spain[i].split(" ")[1]})\n`;
    }
    stationsembed3.addField("🇪🇸 Spain", `>>> ${Spain}`, true);
    amount++;
    let Sweden = "";
    for (let i = 0; i < radios.EU.Sweden.length; i++) {
      Sweden += `**${i + 1 + 10 * amount}**[${radios.EU.Sweden[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Sweden[i].split(" ")[1]})\n`;
    }
    stationsembed3.addField("🇸🇪 Sweden", `>>> ${Sweden}`, true);
    amount++;
    let Ukraine = "";
    for (let i = 0; i < radios.EU.Ukraine.length; i++) {
      Ukraine += `**${i + 1 + 10 * amount}**[${radios.EU.Ukraine[i].split(" ")[0].replace("-", " ").substr(0, 16)}](${radios.EU.Ukraine[i].split(" ")[1]})\n`;
    }
    stationsembed3.addField("🇺🇦 Ukraine", `>>> ${Ukraine}`, true);
    amount++;
    let requests = "";
    for (let i = 0; i < 10; i++) {
      requests += `**${i + 1 + 10 * amount}**[${radios.OTHERS.request[i].split(" ")[0].replace("-", " ").substr(0, 15)}](${radios.OTHERS.request[i].split(" ")[1]})\n`;
    }
    stationsembed3.addField("🧾 OTHERS", `>>> ${requests}`, true);
    requests = "";
    for (let i = 10; i < 20; i++) {
      try {
        requests += `**${i + 1 + 10 * amount}**[${radios.OTHERS.request[i].split(" ")[0].replace("-", " ").substr(0, 15)}](${radios.OTHERS.request[i].split(" ")[1]})\n`;
      } catch {}
    }
    stationsembed3.addField("🧾 OTHERS", `>>> ${requests}`, true);
    message.channel.send(stationsembed);
    message.channel.send(stationsembed2);
    message.channel.send(stationsembed3);
  } catch (e) {
    console.log(e)
  }
}
function databasing(client, guildid, userid) {
  try {
    if (guildid) {
      client.settings.ensure(guildid, {
        prefix: config.prefix,
        pruning: true,
        requestonly: true,
        djroles: [],
        djonlycmds: ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"],
        botchannel: [],
      });
    }
    return;
  } catch (e) {
    console.log(e)
  }
}
function escapeRegex(str) {
  try {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  } catch (e) {
    console.log(e)
  }
}

function arrayMove(array, from, to) {
  try {
    array = [...array];
    const startIndex = from < 0 ? array.length + from : from;
    if (startIndex >= 0 && startIndex < array.length) {
      const endIndex = to < 0 ? array.length + to : to;
      const [item] = array.splice(from, 1);
      array.splice(endIndex, 0, item);
    }
    return array;
  } catch (e) {
    console.log(e)
  }
}
async function promptMessage(message, author, time, validReactions) {
  try {
    time *= 1000;
    for (const reaction of validReactions) await message.react(reaction);
    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
    return message.awaitReactions(filter, {
      max: 1,
      time: time
    }).then((collected) => collected.first() && collected.first().emoji.name);
  } catch (e) {
    console.log(e)
  }
}
async function autoplay (client, player, type) {
  try {
    if (player.queue.size > 0) return;
    const previoustrack = player.get("previoustrack");
    if (!previoustrack) return;

    const mixURL = `https://www.youtube.com/watch?v=${previoustrack.identifier}&list=RD${previoustrack.identifier}`;
    const response = await client.manager.search(mixURL, previoustrack.requester);
    //if nothing is found, send error message, plus if there  is a delay for the empty QUEUE send error message TOO
    if (!response || response.loadType === 'LOAD_FAILED' || response.loadType !== 'PLAYLIST_LOADED') {
      let embed = new MessageEmbed()
        .setTitle("❌ Error | Found nothing related for the latest Song!")
        .setDescription(config.settings.LeaveOnEmpty_Queue.enabled && type != "skip" ? `I'll leave the Channel: ${client.channels.cache.get(player.voiceChannel).name} in: ${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })} If the Queue stays Empty! ` : `I left the Channel: ${client.channels.cache.get(player.voiceChannel).name} because the Queue was empty for: ${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}`)
        .setColor(ee.wrongcolor)
        ;
      client.channels.cache.get(player.textChannel).send(embed);
      if (config.settings.LeaveOnEmpty_Queue.enabled && type != "skip") {
        return setTimeout(() => {
          try {
            player = client.manager.players.get(player.guild);
            if (player.queue.size === 0) {
              let embed = new MessageEmbed()
              try {
                embed.setTitle("❌ Queue has ended.")
              } catch {}
              try {
                embed.setDescription(`I left the Channel: ${client.channels.cache.get(player.voiceChannel).name} because the Queue was empty for: ${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}`)
              } catch {}
              try {
                embed.setColor(ee.wrongcolor)
              } catch {}
              try {
                embed;
              } catch {}
              client.channels.cache
                .get(player.textChannel)
                .send(embed)
              try {
                client.channels.cache
                  .get(player.textChannel)
                  .messagee.wetch(player.get("playermessage")).then(msg => {
                    try {
                      msg.delete({
                        timeout: 7500
                      }).catch(e => console.log("couldn't delete message this is a catch to prevent a crash"));
                    } catch {
                      /* */ }
                  });
              } catch (e) {
                console.log(e);
              }
              player.destroy();
            }
          } catch (e) {
            console.log(e);
          }
        }, config.settings.LeaveOnEmpty_Queue.time_delay);
      } else {
        player.destroy();
      }
    }
    player.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))]);
    return player.play();
  } catch (e) {
    console.log(e)
  }
}


const { MessageButton, MessageActionRow } = require('discord-buttons')

async function swap_pages(client, message, description, TITLE) {

  let currentPage = 0;
  //GET ALL EMBEDS
  let embeds = [];
  //if input is an array
  if (Array.isArray(description)) {
    try {
      let k = 20;
      for (let i = 0; i < description.length; i += 20) {
        const current = description.slice(i, k);
        k += 20;
        const embed = new MessageEmbed()
          .setDescription(current)
          .setTitle(TITLE)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        embeds.push(embed);
      }
      embeds;
    } catch {}
  } else {
    try {
      let k = 1000;
      for (let i = 0; i < description.length; i += 1000) {
        const current = description.slice(i, k);
        k += 1000;
        const embed = new MessageEmbed()
          .setDescription(current)
          .setTitle(TITLE)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
        embeds.push(embed);
      }
      embeds;
    } catch {}
  }
  if (embeds.length === 1) return message.channel.send(embeds[0]).catch(e => console.log("THIS IS TO PREVENT A CRASH"))

  let button_back = new MessageButton().setStyle('green').setID('1').setEmoji("833802907509719130").setLabel("Back")
  let button_home = new MessageButton().setStyle('blurple').setID('2').setEmoji("🏠").setLabel("Home")
  let button_forward = new MessageButton().setStyle('green').setID('3').setEmoji('832598861813776394').setLabel("Forward")
  const allbuttons = [button_back, button_home, button_forward]
  //Send message with buttons
  let swapmsg = await message.channel.send({   
      content: `***Click on the __Buttons__ to swap the Pages***`,
      embed: embeds[0], 
      buttons: allbuttons
  });
  //create a collector for the thinggy
  const collector = swapmsg.createButtonCollector(button => !button.clicker.user.bot, { time: 180e3 }); //collector for 5 seconds
  //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
  collector.on('collect', async b => {
      if(b.clicker.user.id !== message.author.id)
        return b.reply.send(`:x: **Only the one who typed ${prefix}help is allowed to react!**`, true)
        //page forward
        if(b.id == "1") {
          //b.reply.send("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
            if (currentPage !== 0) {
              currentPage -= 1
              await swapmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
              await b.reply.defer();
            } else {
                currentPage = embeds.length - 1
                await swapmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
                await b.reply.defer();
            }
        }
        //go home
        else if(b.id == "2"){
          //b.reply.send("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
            currentPage = 0;
            await swapmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
            await b.reply.defer();
        } 
        //go forward
        else if(b.id == "3"){
          //b.reply.send("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
            if (currentPage < embeds.length - 1) {
                currentPage++;
                await swapmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
                await b.reply.defer();
            } else {
                currentPage = 0
                await swapmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
                await b.reply.defer();
            }
        
      }
  });
  
  const alldisabledbuttons = [button_back.setDisabled(true), button_home.setDisabled(true), button_forward.setDisabled(true)]
  collector.on('end', collected => {
    edited = true;
    swapmsg.edit({content: `Time has ended!`, embed: swapmsg.embeds[0], buttons: alldisabledbuttons})
  });
  setTimeout(()=>{
    if(!edited)
    swapmsg.edit({content: `Time has ended!`, embed: swapmsg.embeds[0], buttons: alldisabledbuttons})
  }, 180e3 + 150)

}

async function swap_pages2(client, message, embeds) {

  let currentPage = 0;
  if (embeds.length === 1) return message.channel.send(embeds[0]).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  
  let button_back = new MessageButton().setStyle('green').setID('1').setEmoji("833802907509719130").setLabel("Back")
  let button_home = new MessageButton().setStyle('blurple').setID('2').setEmoji("🏠").setLabel("Home")
  let button_forward = new MessageButton().setStyle('green').setID('3').setEmoji('832598861813776394').setLabel("Forward")
  const allbuttons = [button_back, button_home, button_forward]
  //Send message with buttons
  let swapmsg = await message.channel.send({   
      content: `***Click on the __Buttons__ to swap the Pages***`,
      embed: embeds[0], 
      buttons: allbuttons
  });
  //create a collector for the thinggy
  const collector = swapmsg.createButtonCollector(button => !button.clicker.user.bot, { time: 180e3 }); //collector for 5 seconds
  //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
  collector.on('collect', async b => {
      if(b.clicker.user.id !== message.author.id)
        return b.reply.send(`:x: **Only the one who typed ${prefix}help is allowed to react!**`, true)
        //page forward
        if(b.id == "1") {
          //b.reply.send("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
            if (currentPage !== 0) {
              currentPage -= 1
              await swapmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
              await b.reply.defer();
            } else {
                currentPage = embeds.length - 1
                await swapmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
                await b.reply.defer();
            }
        }
        //go home
        else if(b.id == "2"){
          //b.reply.send("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
            currentPage = 0;
            await swapmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
            await b.reply.defer();
        } 
        //go forward
        else if(b.id == "3"){
          //b.reply.send("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
            if (currentPage < embeds.length - 1) {
                currentPage++;
                await swapmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
                await b.reply.defer();
            } else {
                currentPage = 0
                await swapmsg.edit({embed:embeds[currentPage], buttons: allbuttons});
                await b.reply.defer();
            }
        
      }
  });
  
  const alldisabledbuttons = [button_back.setDisabled(true), button_home.setDisabled(true), button_forward.setDisabled(true)]
  collector.on('end', collected => {
    edited = true;
    swapmsg.edit({content: `Time has ended!`, embed: swapmsg.embeds[0], buttons: alldisabledbuttons})
  });
  setTimeout(()=>{
    if(!edited)
    swapmsg.edit({content: `Time has ended!`, embed: swapmsg.embeds[0], buttons: alldisabledbuttons})
  }, 180e3 + 150)

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
