const Discord = require("discord.js");
const {
  Client,
  Collection,
  MessageEmbed,
  MessageAttachment
} = require("discord.js");
const config = require("../config.json");
const ms = require("ms")
const officegen = require('officegen')
const fs = require('fs')



module.exports.ensure_economy_user = ensure_economy_user;
module.exports.nFormatter = nFormatter;
module.exports.create_transcript = create_transcript;
module.exports.databasing = databasing;
module.exports.simple_databasing = simple_databasing;
module.exports.reset_DB = reset_DB;
module.exports.change_status = change_status;
module.exports.check_voice_channels = check_voice_channels;
module.exports.check_created_voice_channels = check_created_voice_channels;
module.exports.create_join_to_create_Channel = create_join_to_create_Channel;
module.exports.getMember = getMember;
module.exports.shuffle = shuffle;
module.exports.formatDate = formatDate;
module.exports.promptMessage = promptMessage;
module.exports.delay = delay;
module.exports.getRandomInt = getRandomInt;

module.exports.duration = duration;
module.exports.getRandomNum = getRandomNum;
module.exports.createBar = createBar;
module.exports.format = format;
module.exports.stations = stations;
module.exports.swap_pages2 = swap_pages2;
module.exports.swap_pages = swap_pages;

module.exports.escapeRegex = escapeRegex;
module.exports.autoplay = autoplay;
module.exports.arrayMove = arrayMove;

module.exports.edit_msg = edit_msg;
module.exports.send_roster = send_roster;
module.exports.edit_msg2 = edit_msg2;
module.exports.send_roster2 = send_roster2;
module.exports.edit_msg3 = edit_msg3;
module.exports.send_roster3 = send_roster3;
module.exports.isValidURL = isValidURL;
module.exports.GetUser = GetUser;
module.exports.GetRole = GetRole;
module.exports.GetGlobalUser = GetGlobalUser;

module.exports.parseMilliseconds = parseMilliseconds;

function parseMilliseconds(milliseconds) {
	if (typeof milliseconds !== 'number') {
		throw new TypeError('Expected a number');
	}

	return {
		days: Math.trunc(milliseconds / 86400000),
		hours: Math.trunc(milliseconds / 3600000) % 24,
		minutes: Math.trunc(milliseconds / 60000) % 60,
		seconds: Math.trunc(milliseconds / 1000) % 60,
		milliseconds: Math.trunc(milliseconds) % 1000,
		microseconds: Math.trunc(milliseconds * 1000) % 1000,
		nanoseconds: Math.trunc(milliseconds * 1e6) % 1000
	};
}

function isValidURL(string) {
  const args = string.split(" ");
  let url;
  for(const arg of args){
    try {
      url = new URL(arg);
      url = url.protocol === "http:" || url.protocol === "https:";
      break;
    } catch (_) {
      url = false;
    }
  }
  return url;
};
function GetUser(message, arg){
  var errormessage = "<:no:833101993668771842> I failed finding that User...";
  return new Promise(async (resolve, reject) => {
    var args = arg, client = message.client;
    if(!client || !message) return reject("CLIENT IS NOT DEFINED")
    if(!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
    let user = message.mentions.users.first();
    if(!user && args[0] && args[0].length == 18) {
      user = await client.users.fetch(args[0])
      if(!user) return reject(errormessage)
      return resolve(user);
    }
    else if(!user && args[0]){
      let alluser = message.guild.members.cache.map(member=> String(member.user.tag).toLowerCase())
      user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
      user = message.guild.members.cache.find(me => String(me.user.tag).toLowerCase() == user)
      if(!user || user == null || !user.id) {
        alluser = message.guild.members.cache.map(member => String(member.displayName + "#" + member.user.discriminator).toLowerCase())
        user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
        user = message.guild.members.cache.find(me => String(me.displayName + "#" + me.user.discriminator).toLowerCase() == user)
        if(!user || user == null || !user.id) return reject(errormessage)
      }
      user = await client.users.fetch(user.user.id)
      if(!user) return reject(errormessage)
      return resolve(user);
    }
    else {
      user = message.mentions.users.first() || message.author;
      return resolve(user);
    }
  })
}
function GetRole(message, arg){
  var errormessage = "<:no:833101993668771842> I failed finding that Role...";
  return new Promise(async (resolve, reject) => {
    var args = arg, client = message.client;
    if(!client || !message) return reject("CLIENT IS NOT DEFINED")
    if(!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
    let user = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
    if(!user && args[0] && args[0].length == 18) {
      user = message.guild.roles.cache.get(args[0])
      if(!user) return reject(errormessage)
      return resolve(user);
    }
    else if(!user && args[0]){
      let alluser = message.guild.roles.cache.map(role => String(role.name).toLowerCase())
      user = alluser.find(r => r.split(" ").join("").includes(args.join("").toLowerCase()))
      user = message.guild.roles.cache.find(role => String(role.name).toLowerCase() === user)
      if(!user) return reject(errormessage)
      return resolve(user);
    }
    else {
      user = message.mentions.roles.filter(role=>role.guild.id==message.guild.id).first();
      if(!user) return reject(errormessage)
      return resolve(user);
    }
  })
}
function GetGlobalUser(message, arg){
  var errormessage = "<:no:833101993668771842> I failed finding that User...";
  return new Promise(async (resolve, reject) => {
    var args = arg, client = message.client;
    if(!client || !message) return reject("CLIENT IS NOT DEFINED")
    if(!args || args == null || args == undefined) args = message.content.trim().split(/ +/).slice(1);
    let user = message.mentions.users.first();
    if(!user && args[0] && args[0].length == 18) {
      user = await client.users.fetch(args[0])
      if(!user) return reject(errormessage)
      return resolve(user);
    }
    else if(!user && args[0]){
      let alluser = [], allmembers = [];
      var guilds = client.guilds.cache.array()
      for(const g of guilds){
        var members = g.members.cache.array();
        for(const m of members) { alluser.push(m.user.tag); allmembers.push(m); }
      }
      user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
      user = allmembers.find(me => String(me.user.tag).toLowerCase() == user)
      if(!user || user == null || !user.id) {
        user = alluser.find(user => user.startsWith(args.join(" ").toLowerCase()))
        user = allmembers.find(me => String(me.displayName + "#" + me.user.discriminator).toLowerCase() == user)
        if(!user || user == null || !user.id) return reject(errormessage)
      }
      user = await client.users.fetch(user.user.id)
      if(!user) return reject(errormessage)
      return resolve(user);
    }
    else {
      user = message.mentions.users.first() || message.author;
      return resolve(user);
    }
  })
}


function edit_msg(client, guild){
  edit_Roster_msg(client, guild, client.roster)
}
function edit_msg2(client, guild){
  edit_Roster_msg(client, guild, client.roster2)
}
function edit_msg3(client, guild){
  edit_Roster_msg(client, guild, client.roster3)
}


function send_roster(client, guild){
  send_roster_msg(client, guild, client.roster)
}
function send_roster2(client, guild){
  send_roster_msg(client, guild, client.roster2)
}
function send_roster3(client, guild){
  send_roster_msg(client, guild, client.roster3)
}
/**
 * function edit_Roster_msg
 * @param {*} client | The Discord Bot Client
 * @param {*} guild | The Guild to edit the Message at
 * @param {*} the_roster_db | the Database of the Roster
 * @returns true / false + edits the message
 */
async function edit_Roster_msg(client, guild, the_roster_db) {
  try{

    var data = the_roster_db.get(guild.id)
    //get the EMBED SETTINGS
    let es = client.settings.get(guild.id, "embed")
    //if the rosterchannel is not valid, then send error + return
    if (data.rosterchannel == "notvalid")
      return //console.log("Roster Channel not valid | :: | " + data.rosterchannel);
    //get the channel from the guild
    let channel = guild.channels.cache.get(data.rosterchannel)
    //get the channel from the client if not found from the guild
    if (!channel) 
      channel = client.channels.cache.get(data.rosterchannel);
    //if the rosterchannel is not found, then send error + return
    if (!channel) 
      return //console.log("Roster Channel not found | :: | " + data.rosterchannel);
    //if the defined message length is less then 2 try return error (not setupped)
    if(data.rostermessage.length < 2) 
      return //console.log("Roster Message not valid | :: | " + data.rostermessage);
    //fetch the message from the channel
    let message = await channel.messages.fetch(data.rostermessage);
    //if the message is undefined, then send the message ;)
    if (!message || message == null || !message.id || message.id == null) 
      return send_roster(client, guild);
    //define a variable for the total break of the loop later
    let totalbreak = false;
    //define the embed
    let rosterembed = new Discord.MessageEmbed()
      .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon)
      .setTitle(String(data.rostertitle).substr(0, 256))
    //get rosterole and loop through every single role
    let rosterroles = data.rosterroles;
    //if there are no roles added add this to the embed
    if (rosterroles.length === 0) 
      rosterembed.addField("NO ROLES ADDED", `Add them with: \`${client.settings.get(guild.id, "prefix")}setup-roster\``)
    //loop through every single role
    for (let i = 0; i < rosterroles.length; i++) {  
      //get the role
      let role = await guild.roles.fetch(rosterroles[i])
      //if no valid role skip
      if(!role || role == undefined || !role.members || role.members == undefined) continue;  
      //if the embed is too big break
      if (rosterembed.length > 5900) break;
      //get the maximum field value length on an variabel
      let leftnum = 1024;
      //if the length is bigger then the maximum length - the leftnumber
      if (rosterembed.length > 6000 - leftnum) {
        //set the left number to the maximumlength - the leftnumber
        leftnum = rosterembed.length - leftnum - 100;
      }
      //try to send the roster with the right style..
      if (data.rosterstyle == "1") {
        //define the memberarray
        let memberarray = role.members.map(member => `${the_roster_db.get(guild.id, "rosteremoji")} <@${member.user.id}> | \`${member.user.tag}\``)
        //loopthrough the array for 20 members / page
        for (let i = 0; i < memberarray.length; i += 20) {
          var thearray = memberarray;
          if (rosterembed.length > 5000) break;
          if (!the_roster_db.get(guild.id, "showallroles") || memberarray.length < 20)
            try { 
              rosterembed.addField(`**__${role.name.toUpperCase()} [${role.members.array().length}]__**`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum) + `${role.members.array().length - 20 > 0 ? `\n${the_roster_db.get(guild.id, "rosteremoji")} ***\`${role.members.array().length - 20}\` other Members have this Role ...***`: ""}`.substr(0, 1024), the_roster_db.get(guild.id, "inline"))
              break;
            } catch (e) {
              console.log(e)
            }
          else
            try {
              rosterembed.addField(`\u200b`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"))
            } catch (e) {
              console.log(e)
            }
        }
        //if there are no members who have this role, do this
        if(memberarray.length === 0){
          try {
            rosterembed.addField(`**__${role.name.toUpperCase()} [0]__**`, "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"))
          } catch (e) {
            console.log(e)
          }
        }
      } else if (data.rosterstyle == "2") {
        //define the memberarray
        let memberarray = role.members.map(member => `${the_roster_db.get(guild.id, "rosteremoji")} <@${member.user.id}>`)
        //loopthrough the array for 20 members / page
        for (let i = 0; i < memberarray.length; i += 20) {
          var thearray = memberarray;
          if (rosterembed.length > 5000) break;
          if (!the_roster_db.get(guild.id, "showallroles") || memberarray.length < 20)
            try {
              rosterembed.addField(`**__${role.name.toUpperCase()} [${role.members.array().length}]__**`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum)+ `${role.members.array().length - 20 > 0 ? `\n${the_roster_db.get(guild.id, "rosteremoji")} ***\`${role.members.array().length - 20}\` other Members have this Role ...***`: ""}`.substr(0, 1024), the_roster_db.get(guild.id, "inline"))
              break;
            } catch (e) {
              console.log(e)
            }
          else
            try {
              rosterembed.addField(`\u200b`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"))
            } catch (e) {
              console.log(e)
            }
        }
        //if there are no members who have this role, do this
        if(memberarray.length === 0){
          try {
            rosterembed.addField(`**__${role.name.toUpperCase()} [0]__**`, "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"))
          } catch (e) {
            console.log(e)
          }
        }
      } else if (data.rosterstyle == "3") {
        //define the memberarray
        let memberarray = role.members.map(member => `${the_roster_db.get(guild.id, "rosteremoji")} **${member.user.tag}**`)
        //loopthrough the array for 20 members / page
        for (let i = 0; i < memberarray.length; i += 20) {
          var thearray = memberarray;
          if (rosterembed.length > 5000) break;
          if (!the_roster_db.get(guild.id, "showallroles") || memberarray.length < 20)
            try {
              rosterembed.addField(`**__${role.name.toUpperCase()} [${role.members.array().length}]__**`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum)+ `${role.members.array().length - 20 > 0 ? `\n${the_roster_db.get(guild.id, "rosteremoji")} ***\`${role.members.array().length - 20}\` other Members have this Role ...***`: ""}`.substr(0, 1024), the_roster_db.get(guild.id, "inline"))
              break;
            } catch (e) {
              console.log(e)
            }
          else
            try {
              rosterembed.addField(`\u200b`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"))
            } catch (e) {
              console.log(e)
            }
        }     
        //if there are no members who have this role, do this   
        if(memberarray.length === 0){
          try {
            rosterembed.addField(`**__${role.name.toUpperCase()} [0]__**`, "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"))
          } catch (e) {
            console.log(e)
          }
        }
      } else if (data.rosterstyle == "4") {
        //define the memberarray
        let memberarray = role.members.map(member => `${the_roster_db.get(guild.id, "rosteremoji")} **${member.user.username}**`)
        //loopthrough the array for 20 members / page
        for (let i = 0; i < memberarray.length; i += 20) {
          var thearray = memberarray;
          if (rosterembed.length > 5000) break;
          if (!the_roster_db.get(guild.id, "showallroles") || memberarray.length < 20)
            try {
              rosterembed.addField(`**__${role.name.toUpperCase()} [${role.members.array().length}]__**`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum)+ `${role.members.array().length - 20 > 0 ? `\n${the_roster_db.get(guild.id, "rosteremoji")} ***\`${role.members.array().length - 20}\` other Members have this Role ...***`: ""}`.substr(0, 1024), the_roster_db.get(guild.id, "inline"))
              break;
            } catch (e) {
              console.log(e)
            }
          else
            try {
              rosterembed.addField(`\u200b`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"))
            } catch (e) {
              console.log(e)
            }
        }
        //if there are no members who have this role, do this
        if(memberarray.length === 0){
          try {
            rosterembed.addField(`**__${role.name.toUpperCase()} [0]__**`, "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"))
          } catch (e) {
            console.log(e)
          }
        }
      } else if (data.rosterstyle == "5") {
        //define the memberarray
        let memberarray = role.members.map(member => `${the_roster_db.get(guild.id, "rosteremoji")} <@${member.user.id}> | \`${member.user.id}\``)
        //loopthrough the array for 20 members / page
        for (let i = 0; i < memberarray.length; i += 20) {
          var thearray = memberarray;
          if (rosterembed.length > 5000) break;
          if (!the_roster_db.get(guild.id, "showallroles") || memberarray.length < 20)
            try {
              rosterembed.addField(`**__${role.name.toUpperCase()} [${role.members.array().length}]__**`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum)+ `${role.members.array().length - 20 > 0 ? `\n${the_roster_db.get(guild.id, "rosteremoji")} ***\`${role.members.array().length - 20}\` other Members have this Role ...***`: ""}`.substr(0, 1024), the_roster_db.get(guild.id, "inline"))
            } catch (e) {
              console.log(e)
            }
          else
            try {
              rosterembed.addField(`\u200b`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"))
            } catch (e) {
              console.log(e)
            }
        }
        //if there are no members who have this role, do this
        if(memberarray.length === 0){
          try {
            rosterembed.addField(`**__${role.name.toUpperCase()} [0]__**`, "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"))
            break;
          } catch (e) {
            console.log(e)
          }
        }
      } else if (data.rosterstyle == "6") {
        //define the memberarray
        let memberarray = role.members.map(member => `${the_roster_db.get(guild.id, "rosteremoji")} <@${member.user.id}> | **${member.user.username}**`)
        //loopthrough the array for 20 members / page
        for (let i = 0; i < memberarray.length; i += 20) {

          var thearray = memberarray;
          if (rosterembed.length > 5000) break;
          if (!thearray) return;
          if (!the_roster_db.get(guild.id, "showallroles") || memberarray.length < 20)
            try {
              rosterembed.addField(`**__${role.name.toUpperCase()} [${role.members.array().length}]__**`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum)+ `${role.members.array().length - 20 > 0 ? `\n${the_roster_db.get(guild.id, "rosteremoji")} ***\`${role.members.array().length - 20}\` other Members have this Role ...***`: ""}`.substr(0, 1024), the_roster_db.get(guild.id, "inline"))
              break;
            } catch (e) {
              console.log(e)
            }
          else
            try {
              rosterembed.addField(`\u200b`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"))
            } catch (e) {
              console.log(e)
            }
        }
        //if there are no members who have this role, do this
        if(memberarray.length === 0){
          try {
            rosterembed.addField(`**__${role.name.toUpperCase()} [0]__**`, "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"))
          } catch (e) {
            console.log(e)
          }
        }
      } else if (data.rosterstyle == "7") {
        //define the memberarray
        let memberarray = role.members.map(member => `${the_roster_db.get(guild.id, "rosteremoji")} <@${member.user.id}> | **${member.user.tag}**`)
        //loopthrough the array for 20 members / page
        for (let i = 0; i < memberarray.length; i += 20) {
          var thearray = memberarray;
          if (rosterembed.length > 5000) break;
          if (!the_roster_db.get(guild.id, "showallroles") || memberarray.length < 20)
            try {
              rosterembed.addField(`**__${role.name.toUpperCase()} [${role.members.array().length}]__**`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum)+ `${role.members.array().length - 20 > 0 ? `\n${the_roster_db.get(guild.id, "rosteremoji")} ***\`${role.members.array().length - 20}\` other Members have this Role ...***`: ""}`.substr(0, 1024), the_roster_db.get(guild.id, "inline"))
              break;
            } catch (e) {
              console.log(e)
            }
          else
            try {
              rosterembed.addField(`\u200b`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"))
            } catch (e) {
              console.log(e)
            }
        }
        //if there are no members who have this role, do this
        if(memberarray.length === 0){
          try {
            rosterembed.addField(`**__${role.name.toUpperCase()} [0]__**`, "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"))

          } catch (e) {
            console.log(e)
          }
        }
      } else {
        //define the memberarray
        let memberarray = role.members.map(member => `${the_roster_db.get(guild.id, "rosteremoji")} <@${member.user.id}> | \`${member.user.tag}\``)
        //loopthrough the array for 20 members / page
        for (let i = 0; i < memberarray.length; i += 20) {
          if (rosterembed.length > 5000) leftnum = 800;
          if (rosterembed.length > 5500) {
            totalbreak = true;
            break;
          }
          if (!the_roster_db.get(guild.id, "showallroles") || memberarray.length < 20)
            try {
              rosterembed.addField(`**__${role.name.toUpperCase()} [${role.members.array().length}]__**`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum)+ `${role.members.array().length - 20 > 0 ? `\n${the_roster_db.get(guild.id, "rosteremoji")} ***\`${role.members.array().length - 20}\` other Members have this Role ...***`: ""}`.substr(0, 1024), the_roster_db.get(guild.id, "inline"))
              break;
            } catch (e) {
              console.log(e)
            }
          else
            try {
              rosterembed.addField(`\u200b`, role.members.array().length == 0 ? "> No one has this Role" : thearray.slice(i, i + 20).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"))
            } catch (e) {
              console.log(e)
            }
        }
        //if there are no members who have this role, do this
        if(memberarray.length === 0){
          try {
            rosterembed.addField(`**__${role.name.toUpperCase()} [0]__**`, "> ***No one has this Role***".substr(0, 1024), the_roster_db.get(guild.id, "inline"))
          } catch (e) {
            console.log(e)
          }
        }
      }

      //if a totalbreak happened, then return + edit the message
      if (totalbreak) return message.edit({embed: rosterembed}).catch(e => console.log("could not edit roster 1"  + e));
    }
    //after the loop, edit the message
    message.edit({embed: rosterembed}).catch(e => console.log("! Could not edit roster 1" + e));
    
  }catch{
    console.log("ROSTER_COULD NOT FIND THE MESSAGE".grey)
  }
}
async function send_roster_msg(client, guild, the_roster_db) {
  //ensure the database
  the_roster_db.ensure(guild.id, {
    rosterchannel: "notvalid", showallroles: false, rostermessage: "", rostertitle: "Roster",
    rosteremoji: "➤", rosterstyle: "1", rosterroles: [], inline: false,
  })
  let es = client.settings.get(guild.id, "embed")
  if (the_roster_db.get(guild.id, "rosterchannel") == "notvalid") return;
  let channel = await client.channels.fetch(the_roster_db.get(guild.id, "rosterchannel"));
  //define the embed
  let rosterembed = new Discord.MessageEmbed()
    .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
    .setTitle(String(the_roster_db.get(guild.id, "rostertitle")).substr(0, 256))
    .setFooter(es.footertext, es.footericon)
  //get rosterole and loop through every single role
  let rosterroles = the_roster_db.get(guild.id, "rosterroles");
  if (rosterroles.length === 0) try {
    rosterembed.addField("NO ROLES ADDED", `Add them with: \`${client.settings.get(guild.id, "prefix")}setup-roster\``)
  } catch (e) {
    console.log(e)
  }
  for (let i = 0; i < rosterroles.length; i++) {
    let role = guild.roles.cache.get(rosterroles[i])
    //if the embed is too big break
    if (rosterembed.length > 5900) break;
    //get the maximum field value length on an variabel
    let leftnum = 1024;
    //if the length is bigger then the maximum length - the leftnumber
    if (rosterembed.length > 6000 - leftnum) {
      //set the left number to the maximumlength - the leftnumber
      leftnum = rosterembed.length - leftnum;
    }
    try {
      rosterembed.addField(`**__${role.name.toUpperCase()} [${role.members.array().length}]__**`, role.members.array().length === 0 ? "> No one has this Role" : role.members.map(member => `${the_roster_db.get(guild.id, "rosteremoji")} <@${member.user.id}> | \`${member.user.tag}\``).join("\n").substr(0, leftnum), the_roster_db.get(guild.id, "inline"))
    } catch (e) {
      console.log(e)
    }
  }
  channel.send(rosterembed).then(msg => {
    the_roster_db.set(guild.id, msg.id, "rostermessage");
    setTimeout(() => {
      edit_msg(client, guild)
    }, 500)
  }).catch(e => console.log("Couldn't send a message, give the Bot permissions or smt!"))
}

function getMember(message, toFind = "") {
    toFind = toFind.toLowerCase();
    let target = message.guild.members.cache.get(toFind);
    if (!target && message.mentions.members) target = message.mentions.members.filter(member=>member.guild.id==message.guild.id).first();
    if (!target && toFind) {
      target = message.guild.members.cache.find((member) => {
        return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
      });
    }
    if (!target) target = message.member;
    return target;
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
    console.log(String(e.stack).bgRed)
  }
}

function formatDate(date) {
  try {
    return new Intl.DateTimeFormat("en-US").format(date);
  } catch (e) {
    console.log(String(e.stack).bgRed)
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


async function promptMessage(message, author, time, validReactions) {
  let es = client.settings.get(message.guild.id, "embed")
  try {
    time *= 1000;
    for (const reaction of validReactions) await message.react(reaction);
    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
    return message.awaitReactions(filter, {
      max: 1,
      time: time
    }).then((collected) => collected.first() && collected.first().emoji.name);
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function delay(delayInms) {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function getRandomInt(max) {
  try {
    return Math.floor(Math.random() * Math.floor(max));
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function getRandomNum(min, max) {
  try {
    return Math.floor(Math.random() * Math.floor((max - min) + min));
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function createBar(player) {
  try {
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
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function format(millis) {
  try {
    var h = Math.floor(millis / 3600000),
      m = Math.floor(millis / 60000),
      s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function stations(client, prefix, message) {
  let es = client.settings.get(message.guild.id, "embed")

  try {
    let amount = 0;
    const stationsembed = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 11`");
    const stationsembed2 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 69`");
    const stationsembed3 = new MessageEmbed().setColor(es.color).setThumbnail(es.thumb ? es.footericon : null).setFooter(es.footertext, es.footericon).setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription("Example: `?radio 180`");
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
    message.channel.send(stationsembed).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
    message.channel.send(stationsembed2).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
    message.channel.send(stationsembed3).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function escapeRegex(str) {
  try {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

async function autoplay(client, player, type) {
  let es = client.settings.get(player.guild, "embed")
  try {
    if (player.queue.length > 0) return;
    const previoustrack = player.get("previoustrack");
    if (!previoustrack) return;

    const mixURL = `https://www.youtube.com/watch?v=${previoustrack.identifier}&list=RD${previoustrack.identifier}`;
    const response = await client.manager.search(mixURL, previoustrack.requester);
    //if nothing is found, send error message, plus if there  is a delay for the empty QUEUE send error message TOO
    if (!response || response.loadType === 'LOAD_FAILED' || response.loadType !== 'PLAYLIST_LOADED') {
      let embed = new MessageEmbed()
        .setTitle("<:no:833101993668771842> Found nothing related for the latest Song!")
        .setDescription(config.settings.LeaveOnEmpty_Queue.enabled && type != "skip" ? `I'll leave the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\` in: \`${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}\`, If the Queue stays Empty! ` : `I left the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\` because the Queue was empty for: \`${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}\``)
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon);
      client.channels.cache.get(player.textChannel).send(embed).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
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
                embed.setDescription(`I left the Channel: \`${client.channels.cache.get(player.voiceChannel).name}\` because the Queue was empty for: \`${ms(config.settings.LeaveOnEmpty_Queue.time_delay, { long: true })}\``)
              } catch {}
              try {
                embed.setColor(es.wrongcolor)
              } catch {}
              try {
                embed.setFooter(es.footertext, es.footericon);
              } catch {}
              client.channels.cache
                .get(player.textChannel)
                .send(embed).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
              try {
                client.channels.cache
                  .get(player.textChannel)
                  .messages.fetch(player.get("playermessage")).then(async msg => {
                    try {
                      await delay(7500)
                      if (msg && message.channel.messages.cache.get(msg.id)) msg.delete();
                    } catch {
                      /* */
                    }
                  });
              } catch (e) {
                console.log(String(e.stack).yellow);
              }
              player.destroy();
            }
          } catch (e) {
            console.log(String(e.stack).yellow);
          }
        }, config.settings.LeaveOnEmpty_Queue.time_delay);
      } else {
        player.destroy();
      }
    }
    player.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))]);
    return player.play();
  } catch (e) {
    console.log(String(e.stack).bgRed)
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
    console.log(String(e.stack).bgRed)
  }
}
function nFormatter(num, digits = 2) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
async function swap_pages(client, message, description, TITLE) {
  let es = client.settings.get(message.guild.id, "embed")

  let currentPage = 0;
  //GET ALL EMBEDS
  let embeds = [];
  //if input is an array
  if (Array.isArray(description)) {
    try {
      let k = 15;
      for (let i = 0; i < description.length; i += 15) {
        const current = description.slice(i, k);
        k += 15;
        const embed = new MessageEmbed()
          .setDescription(current)
          .setTitle(TITLE)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
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
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
          .setFooter(es.footertext, es.footericon)
        embeds.push(embed);
      }
      embeds;
    } catch {}
  }
  if (embeds.length === 1) return message.channel.send(embeds[0]).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  const queueEmbed = await message.channel.send(
    `**Current Page - ${currentPage + 1}/${embeds.length}**`,
    embeds[currentPage]
  ).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  let reactionemojis = ["⬅️", "⏹", "➡️"];
  try {
    for (const emoji of reactionemojis)
      await queueEmbed.react(emoji);
  } catch {}

  const filter = (reaction, user) =>
    (reactionemojis.includes(reaction.emoji.name) || reactionemojis.includes(reaction.emoji.name)) && message.author.id === user.id;
  const collector = queueEmbed.createReactionCollector(filter, {
    time: 45000
  });

  collector.on("collect", async (reaction, user) => {
    try {
      if (reaction.emoji.name === reactionemojis[2] || reaction.emoji.id === reactionemojis[2]) {
        if (currentPage < embeds.length - 1) {
          currentPage++;
          queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`,{content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
        } else {
          currentPage = 0
          queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`,{content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
        }
      } else if (reaction.emoji.name === reactionemojis[0] || reaction.emoji.id === reactionemojis[0]) {
        if (currentPage !== 0) {
          --currentPage;
          queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`,{content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
        } else {
          currentPage = embeds.length - 1
          queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`,{content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
        }
      } else {
        collector.stop();
        reaction.message.reactions.removeAll();
      }
      await reaction.users.remove(message.author.id);
    } catch {}
  });

}

async function swap_pages2(client, message, embeds) {
  let es = client.settings.get(message.guild.id, "embed")

  let currentPage = 0;
  if (embeds.length === 1) return message.channel.send(embeds[0]).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  queueEmbed = await message.channel.send(
    `**Current Page - ${currentPage + 1}/${embeds.length}**`,
    embeds[currentPage]
  ).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  let reactionemojis = ["⬅️", "⏹", "➡️"];
  try {
    for (const emoji of reactionemojis)
      await queueEmbed.react(emoji);
  } catch {}

  const filter = (reaction, user) =>
    (reactionemojis.includes(reaction.emoji.name) || reactionemojis.includes(reaction.emoji.name)) && message.author.id === user.id;
  const collector = queueEmbed.createReactionCollector(filter, {
    time: 45000
  });

  collector.on("collect", async (reaction, user) => {
    try {
      if (reaction.emoji.name === reactionemojis[2] || reaction.emoji.id === reactionemojis[2]) {
        if (currentPage < embeds.length - 1) {
          currentPage++;
          queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`,{content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
        } else {
          currentPage = 0
          queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`,{content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
        }
      } else if (reaction.emoji.name === reactionemojis[0] || reaction.emoji.id === reactionemojis[0]) {
        if (currentPage !== 0) {
          --currentPage;
          queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`,{content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
        } else {
          currentPage = embeds.length - 1
          queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`,{content: `**Current Page - ${currentPage + 1}/${embeds.length}**`, embed: embeds[currentPage]});
        }
      } else {
        collector.stop();
        reaction.message.reactions.removeAll();
      }
      await reaction.users.remove(message.author.id);
    } catch {}
  });

}

function databasing(client, guildid, userid) {
  if(!client || client == undefined || !client.user || client.user == undefined) return;
  try {
    client.stats.ensure("global", {
      commands: 0,
      songs: 0,
      setups: 0
    });
    client.premium.ensure("premiumlist", {
      list: [/*{
        "u": "XXXYYYXXXYYYXXXYYY"
      }, {
        "g": "XXXYYYXXXYYYXXXYYY"
      }*/]
    })
    client.setups.ensure("TICKETS", {
      tickets: [],
      tickets2: [],
      tickets3: [],
      tickets4: [],
      tickets5: []
    })
    if (guildid) {
      client.customcommands.ensure(guildid, {
        commands: []
      })
      client.keyword.ensure(guildid, {
        commands: []
      })
      client.social_log.ensure(guildid, {
        tiktok: {
          channels: [],
          dc_channel: ""
        },
        youtube: {
          channels: [],
          dc_channel: ""
        },
        twitter: {
          TWITTER_USER_ID: "",
          TWITTER_USER_NAME_ONLY_THOSE: "",
          DISCORD_CHANNEL_ID: "",
          latesttweet: "",
          REETWET: false,
          infomsg: "**{Twittername}** posted a new Tweet:\n\n{url}"
        },
        secondtwitter: {
          TWITTER_USER_ID: "",
          TWITTER_USER_NAME_ONLY_THOSE: "",
          DISCORD_CHANNEL_ID: "",
          latesttweet: "",
          REETWET: false,
          infomsg: "**{Twittername}** posted a new Tweet:\n\n{url}"
        },
        twitch: {
          DiscordServerId: guildid,
          channelID: "",
          roleID_PING: "",
          roleID_GIVE: "",
          channels: [],
        }
      })
      client.roster.ensure(guildid, {
        rosterchannel: "notvalid",
        rosteremoji: "➤",
        rostermessage: "",
        rostertitle: "Roster",
        rosterstyle: "1",
        rosterroles: [],
        inline: false,
      })
      client.roster2.ensure(guildid, {
        rosterchannel: "notvalid",
        rosteremoji: "➤",
        rostermessage: "",
        rostertitle: "Roster",
        rosterstyle: "1",
        rosterroles: [],
        inline: false,
      })
      client.roster3.ensure(guildid, {
        rosterchannel: "notvalid",
        rosteremoji: "➤",
        rostermessage: "",
        rostertitle: "Roster",
        rosterstyle: "1",
        rosterroles: [],
        inline: false,
      })
      client.stats.ensure(guildid, {
        commands: 0,
        songs: 0
      });
      client.premium.ensure(guildid, {
        enabled: false,
      })
      client.setups.ensure(guildid, {
        textchannel: "0",
        voicechannel: "0",
        category: "0",
        message_cmd_info: "0",
        message_queue_info: "0",
        message_track_info: "0",
        blacklist: {
          whitelistedroles: [],
          words: [],
          enabled: true
        },
        ticketsystem: {
          enabled: false,
          guildid: guildid,
          messageid: "",
          channelid: "",
          parentid: "",
          message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
          adminroles: []
        },
        ticketsystem2: {
          enabled: false,
          guildid: guildid,
          messageid: "",
          channelid: "",
          parentid: "",
          message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
          adminroles: []
        },
        ticketsystem3: {
          enabled: false,
          guildid: guildid,
          messageid: "",
          channelid: "",
          parentid: "",
          message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
          adminroles: []
        },
        ticketsystem4: {
          enabled: false,
          guildid: guildid,
          messageid: "",
          channelid: "",
          parentid: "",
          message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
          adminroles: []
        },
        ticketsystem5: {
          enabled: false,
          guildid: guildid,
          messageid: "",
          channelid: "",
          parentid: "",
          message: "Hey {user}, thanks for opening an ticket! Someone will help you soon!",
          adminroles: []
        }
      });
      client.blacklist.ensure(guildid, {
        words: []
      });
      client.settings.ensure(guildid, {
        prefix: config.prefix,
        pruning: true,
        requestonly: true,
        channel: "773836425678422046",
        adminlog: "no",
        dailyfact: "no",
        reportlog: "no",
        autoembed: [],
        volume: "69",
        adminroles: [],

        MUSIC: true,
        FUN: true,
        MINIGAMES: true,
        ECONOMY: true,
        SCHOOL: true,
        NSFW: false,
        VOICE: true,
        SOUNDBOARD: true,

        anticaps: {
          enabled: true,
          percent: 75
        },
        cmdadminroles: {
          addrole: [],
          addroletoeveryone: [],
          ban: [],
          clear: [],
          clearbotmessages: [],
          close: [],
          copymessage: [],
          deleterole: [],
          detailwarn: [],
          dm: [],
          editembed: [],
          editimgembed: [],
          embed: [],
          embedbuilder: [],
          esay: [],
          giveaway: [],
          image: [],
          imgembed: [],
          kick: [],
          mute: [],
          poll: [],
          react: [],
          removeallwarns: [],
          removerole: [],
          report: [],
          say: [],
          slowmode: [],
          suggest: [],
          ticket: [],
          unmute: [],
          unwarn: [],
          updatemessage: [],
          warn: [],
          warnings: [],
        },
        antilink: {
          enabled: false,
          whitelistedchannels: []
        },
        antidiscord: {
          enabled: false,
          whitelistedchannels: []
        },
        embed: {
          "color": ee.color,
          "thumb": true,
          "wrongcolor": ee.wrongcolor,
          "footertext": client.guilds.cache.get(guildid) ? client.guilds.cache.get(guildid).name : ee.footertext,
          "footericon": client.guilds.cache.get(guildid) ? client.guilds.cache.get(guildid).iconURL({
            dynamic: true
          }) : ee.footericon,
        },
        logger: {
          "channel": "no",
          "webhook_id": "",
          "webhook_token": ""
        },
        welcome: {
          captcha: false,
          roles: [],
          channel: "nochannel",

          image: true,
          custom: "no",
          background: "transparent",
          frame: true,
          framecolor: "white",
          pb: true,
          invite: true,
          discriminator: true,
          membercount: true,
          servername: true,
          msg: "{user} Welcome to this Server",


          dm: true,

          imagedm: true,
          customdm: "no",
          backgrounddm: "transparent",
          framedm: true,
          framecolordm: "white",
          pbdm: true,
          invitedm: true,
          discriminatordm: true,
          membercountdm: true,
          servernamedm: true,
          dm_msg: "{user} Welcome to this Server"
        },
        leave: {
          channel: "nochannel",

          image: true,
          custom: "no",
          background: "transparent",
          frame: true,
          framecolor: "white",
          pb: true,
          invite: true,
          discriminator: true,
          membercount: true,
          servername: true,
          msg: "{user} left this Server",


          dm: true,

          imagedm: true,
          customdm: "no",
          backgrounddm: "transparent",
          framedm: true,
          framecolordm: "white",
          pbdm: true,
          invitedm: true,
          discriminatordm: true,
          membercountdm: true,
          servernamedm: true,
          dm_msg: "{user} left this Server"
        },
        song: "https://streams.ilovemusic.de/iloveradio14.mp3",
        djroles: [],
        djonlycmds: ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"],
        botchannel: [],
      });
      client.jtcsettings.ensure(guildid, {
        prefix: ".",
        channel: "",
        channelname: "{user}' Room",
        guild: guildid,
      });
      client.jtcsettings2.ensure(guildid, {
        channel: "",
        channelname: "{user}' Channel",
        guild: guildid,
      });
      client.jtcsettings3.ensure(guildid, {
        channel: "",
        channelname: "{user}' Lounge",
        guild: guildid,
      });
    }
    if (userid) {
      client.premium.ensure(userid, {
        enabled: false,
      })
      client.queuesaves.ensure(userid, {
        "TEMPLATEQUEUEINFORMATION": ["queue", "sadasd"]
      });
      client.settings.ensure(userid, {
        dm: true,
      })
      client.stats.ensure(guildid + userid, {
        ban: [],
        kick: [],
        mute: [],
        ticket: [],
        says: [],
        warn: [],
      })
    }
    if (userid && guildid) {
      client.stats.ensure(guildid + userid, {
        ban: [],
        kick: [],
        mute: [],
        ticket: [],
        says: [],
        warn: [],
      })
      client.userProfiles.ensure(userid, {
        id: userid,
        guild: guildid,
        totalActions: 0,
        warnings: [],
        kicks: []
      });
    }
    return;
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function reset_DB(guildid, client) {
  client.settings.set(guildid, {
    prefix: ".",
    channel: "",
    channelname: "{user}' Room",
    guild: guildid,
  });
  client.settings2.set(guildid, {
    channel: "",
    channelname: "{user}' Channel",
    guild: guildid,
  });
  client.settings3.set(guildid, {
    channel: "",
    channelname: "{user}' Lounge",
    guild: guildid,
  });
}

function change_status(client) {
  try {
    client.user.setActivity(`${config.prefix}help | ${config.prefix}setup | ${totalGuilds} Guilds | ${Math.ceil(totalMembers/1000)}k Members`, {
      type: "WATCHING",
      shardID: shard
    });
  } catch (e) {
    client.user.setActivity(`${config.prefix}help | ${config.prefix}setup | ${client.guilds.cache.size} Guilds | ${Math.ceil(client.users.cache.size/1000)}k Members`, {
      type: "WATCHING",
      shardID: 0
    });
  }
}

async function check_voice_channels(client) {
  let guilds = client.guilds.cache.map(guild => guild.id);
  for (let i = 0; i < guilds.length; i++) {
      try {
          let guild = await client.guilds.fetch(guilds[i]);
          client.jtcsettings.ensure(guild.id, {
            channel: "",
            channelname: "{user}' Room",
            guild: guild.id,
          });
          client.jtcsettings2.ensure(guild.id, {
            channel: "",
            channelname: "{user}' Channel",
            guild: guild.id,
          });
          client.jtcsettings3.ensure(guild.id, {
            channel: "",
            channelname: "{user}' Lounge",
            guild: guild.id,
          });
          let jointocreate = []; //get the data from the database onto one variables
          jointocreate.push(client.jtcsettings.get(guild.id, "channel"));
          jointocreate.push(client.jtcsettings2.get(guild.id, "channel"));
          jointocreate.push(client.jtcsettings3.get(guild.id, "channel"));
          await guild.channels.cache.filter(ch => ch.type == "voice" && jointocreate.includes(ch.id)).each(async (channel, j) => {
              try{
                  let members = channel.members.array();
                  if (members && members.length != 0){
                      for (let k = 0; k < members.length; k++) {
                          let themember = await guild.members.fetch(members[k]);
                          create_join_to_create_Channel(client, themember.voice, j + 1);
                      }
                  }else {
                      //console.log("NO MEMBERS")
                  }
              }catch (e){
                  console.log(e)
              }

          });
      } catch (e) {
          console.log(e)
      }
  }
  return;
}

async function check_created_voice_channels(client) {
  let guilds = client.guilds.cache.map(guild => guild.id);
  for (let i = 0; i < guilds.length; i++) {
      try {
          let guild = await client.guilds.fetch(guilds[i]);      
          await guild.channels.cache.filter(ch => ch.type == "voice").each(async vc => {
              try{
                  if(client.jointocreatemap.get(`tempvoicechannel_${vc.guild.id}_${vc.id}`) == vc.id){
                      let members = vc.members.array();
                      if(!members || members == undefined || members.length == undefined || members.length == 0){
                          client.jointocreatemap.delete(`tempvoicechannel_${vc.guild.id}_${vc.id}`);
                          client.jointocreatemap.delete(`owner_${vc.guild.id}_${vc.id}`);
                          console.log(`Deleted the Channel: ${vc.name} in: ${vc.guild ? vc.guild.name : "undefined"} DUE TO EMPTYNESS`.strikethrough.brightRed)
                          vc.delete().catch(e => console.log(e) )
                      }
                  }
              }catch (e){
                 // console.log("Not in db")
              }

          });
      } catch (e) {
          console.log(e)
      }
  }
  return;
}

function create_join_to_create_Channel(client, user, type) {
  if (type == 1) chname = client.jtcsettings.get(user.member.guild.id, "channelname")
  else if (type == 2) chname = client.jtcsettings2.get(user.member.guild.id, "channelname")
  else if (type == 3) chname = client.jtcsettings3.get(user.member.guild.id, "channelname")
  else chname = "{user}'s Room"
  //CREATE THE CHANNEL
  let allowed = true;
  if (!user.guild.me.hasPermission("MANAGE_CHANNELS")) {
    allowed = false;
    try {
      user.member.user.send("${user.member.user} | <:no:833101993668771842> Error | Please give me the permission, `MANGE CHANNELS` --> I need to be able to create Channels ...")
    } catch {
      try {
        let channel = guild.channels.cache.find(
          channel =>
          channel.type === "text" &&
          channel.permissionsFor(guild.me).has("SEND_MESSAGES")
        );
        channel.send(`${user.member.user} | <:no:833101993668771842> Error | Please give me the permission, \`MANGE CHANNELS\` --> I need to be able to create Channels ...`).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
      } catch {}
    }
  }
  if (allowed) {

    console.log(`Created the Channel: ${String(chname.replace("{user}", user.member.user.username)).substr(0, 32)} in: ${user.guild ? user.guild.name : "undefined"}`.brightGreen)

    user.guild.channels.create(String(chname.replace("{user}", user.member.user.username)).substr(0, 32), {
      type: 'voice',
      permissionOverwrites: [ //update the permissions
        {
          id: user.id, //the user is allowed to change everything
          allow: ['MANAGE_CHANNELS', "VIEW_CHANNEL", "MANAGE_ROLES", "CONNECT"],
        }, { //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
          id: user.guild.id,
          allow: ['VIEW_CHANNEL', "CONNECT"],
        },
      ],
    }).then(async vc => {
      //add to the DB
      client.jointocreatemap.set(`owner_${vc.guild.id}_${vc.id}`, user.id);
      client.jointocreatemap.set(`tempvoicechannel_${vc.guild.id}_${vc.id}`, vc.id);
      //if parent do these, else just move the Member
      if (user.channel.parent) {
        //save userlimit on a var
        let userlimit = user.channel.userLimit;
        let Bitrate = user.channel.bitrate;
        //move to parent
        await vc.setParent(user.channel.parent)
        //move user
        await user.setChannel(vc);
        //lock the permissions to category
        await vc.lockPermissions().catch(console.error);
        //set userlimit
        await vc.setUserLimit(userlimit).catch(console.error);
        //set Bitrate
        await vc.setBitrate(Bitrate).catch(console.error);
        //add permissions
        await vc.updateOverwrite(user.id, {
          MANAGE_CHANNELS: true,
          VIEW_CHANNEL: true,
          MANAGE_ROLES: true,
          CONNECT: true,
        }).catch(console.error);

      } else {
        //move the Member
        await user.setChannel(vc);
      }
    })
  }
}

async function create_transcript(message, client, msglimit) {
  //do transcripting - making a docx file with design. Here the Docs: https://github.com/Ziv-Barber/officegen/blob/4bfff80e0915f884199495c0ea64e5a0f0549cfe/manual/docx/README.md#prgapi
  await message.reply(new MessageEmbed().setAuthor("Transcripting...", "https://cdn.discordapp.com/emojis/757632044632375386.gif?v=1"))
  let docx = officegen({
    type: 'docx',
    author: client.user.username,
    creator: client.user.username,
    description: `Transcript for the Channel #${message.channel.name} with the ID: ${message.channel.id}`,
    pageMargins: {
      top: 1000,
      right: 1000,
      bottom: 1000,
      left: 1000
    },
    title: `Transcript!`

  })
  //Logs when to File Got CREATED   =  This does NOT mean that it is finished putting the text in!
  docx.on('finalize', function (written) {})
  //if an error occurs then stop
  docx.on('error', function (err) {
    console.log(err);
    return;
  })
  //The "TITLE" 
  pObj = docx.createP() //Make a new paragraph
  pObj.options.align = 'left'; //align it to the left page
  pObj.options.indentLeft = -350; //overdrive it 350px to the left
  pObj.options.indentFirstLine = -250; //go 250 px to the - left so right of the overdrive
  pObj.addText('Transcript for:    #' + message.channel.name, {
    font_face: 'Arial',
    color: '3c5c63',
    bold: true,
    font_size: 22
  }); //add the TEXT CHANNEL NAME
  pObj.addLineBreak() //make a new LINE
  pObj.addText("Channelid: " + message.channel.id, {
    font_face: 'Arial',
    color: '000000',
    bold: false,
    font_size: 10
  }); //Channel id
  pObj.addLineBreak() //Make a new LINE
  pObj.addText(`Oldest message at the BOTTOM `, {
    hyperlink: 'myBookmark',
    font_face: 'Arial',
    color: '5dbcd2',
    italic: true,
    font_size: 8
  }); //Make a hyperlink to the BOOKMARK (Created later)
  pObj.addText(`  [CLICK HERE TO JUMP]`, {
    hyperlink: 'myBookmark',
    font_face: 'Arial',
    color: '1979a9',
    italic: false,
    bold: true,
    font_size: 8
  }); //Make a hyperlink to the BOOKMARK (Created later)
  pObj.addLineBreak() //Make a new Line
  //The text content collection
  let messageCollection = new Collection(); //make a new collection
  let channelMessages = await message.channel.messages.fetch({ //fetch the last 100 messages
    limit: 100
  }).catch(err => console.log(err)); //catch any error
  messageCollection = messageCollection.concat(channelMessages); //add them to the Collection
  let tomanymsgs = 1; //some calculation for the messagelimit
  if (Number(msglimit) === 0) msglimit = 100; //if its 0 set it to 100
  let messagelimit = Number(msglimit) / 100; //devide it by 100 to get a counter
  if (messagelimit < 1) messagelimit = 1; //set the counter to 1 if its under 1
  while (channelMessages.size === 100) { //make a loop if there are more then 100 messages in this channel to fetch
    if (tomanymsgs === messagelimit) break; //if the counter equals to the limit stop the loop
    tomanymsgs += 1; //add 1 to the counter
    let lastMessageId = channelMessages.lastKey(); //get key of the already fetched messages above
    channelMessages = await message.channel.messages.fetch({
      limit: 100,
      before: lastMessageId
    }).catch(err => console.log(err)); //Fetch again, 100 messages above the already fetched messages
    if (channelMessages) //if its true
      messageCollection = messageCollection.concat(channelMessages); //add them to the collection
  }
  let msgs = messageCollection.array().reverse(); //reverse the array to have it listed like the discord chat
  //now for every message in the array make a new paragraph!
  await msgs.forEach(async msg => {
    // Create a new paragraph:
    pObj = docx.createP()
    pObj.options.align = 'left'; //Also 'right' or 'justify'.
    //Username and Date
    pObj.addText(`${msg.author.tag}`, {
      font_face: 'Arial',
      color: '3c5c63',
      bold: true,
      font_size: 14
    });
    pObj.addText(`  |  ${msg.createdAt.toDateString()}  |  ${msg.createdAt.toLocaleTimeString()}`, {
      font_face: 'Arial',
      color: '3c5c63',
      bold: true,
      font_size: 14
    }); //
    //LINEBREAK
    pObj.addLineBreak()
    //message of user     
    let umsg;

    if (msg.content.startsWith("```")) {
      umsg = msg.content.replace(/```/g, "");
    } else if (msg.attachments.size > 0) {
      umsg = "Unable to transcript (Embed/Video/Audio/etc.)";
    } else {
      umsg = msg.content;
    }
    pObj.addText(umsg, {
      font_face: 'Arial',
      color: '000000',
      bold: false,
      font_size: 10
    });
    //LINEBREAK
    pObj.addLineBreak()
    pObj.addText(`______________________________________________________________________________________________________________________________________________________________________________________________________________`, {
      color: 'a6a6a6',
      font_size: 4
    });

  });
  // Start somewhere a bookmark:
  pObj.startBookmark('myBookmark'); //add a bookmark at tha last message to make the jump 
  pObj.endBookmark();
  let out = fs.createWriteStream(`${message.channel.name}.docx`) //write everything in the docx file
  //if a error happens tells it
  out.on('error', function (err) {
    console.log(err)
  })
  //wenn the writing is finished
  out.on("finish", async function (err, result) {
    await delay(3000);
    return;
  })
  // Async call to generate the output file:
  return docx.generate(out)
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



function simple_databasing(client, guildid, userid) {
  if(!client || client == undefined || !client.user || client.user == undefined) return;
  try {
    client.stats.ensure("global", {
      commands: 0,
      songs: 0,
      setups: 0
    });

    if (guildid) {
      client.customcommands.ensure(guildid, {
        commands: []
      })
      client.stats.ensure(guildid, {
        commands: 0,
        songs: 0
      });
      client.settings.ensure(guildid, {
        prefix: config.prefix,
        pruning: true,
        requestonly: true,
        unkowncmdmessage: false,
        channel: "773836425678422046",

        adminlog: "no",
        reportlog: "no",
        autonsfw: "no",
        dailyfact: "no",

        autoembed: [],
        adminroles: [],

        volume: "69",

        MUSIC: true,
        FUN: true,
        MINIGAMES: true,
        ECONOMY: true,
        SCHOOL: true,
        NSFW: false,
        VOICE: true,
        SOUNDBOARD: true,

        cmdadminroles: {
          addrole: [],
          addroletoeveryone: [],
          ban: [],
          clear: [],
          clearbotmessages: [],
          close: [],
          copymessage: [],
          deleterole: [],
          detailwarn: [],
          dm: [],
          editembed: [],
          editimgembed: [],
          embed: [],
          embedbuilder: [],
          esay: [],
          giveaway: [],
          image: [],
          imgembed: [],
          kick: [],
          mute: [],
          poll: [],
          react: [],
          removeallwarns: [],
          removerole: [],
          report: [],
          say: [],
          slowmode: [],
          suggest: [],
          ticket: [],
          unmute: [],
          unwarn: [],
          updatemessage: [],
          warn: [],
          warnings: [],
        }, 
        djroles: [],
        djonlycmds: ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"],
        botchannel: [],
      });
    }
    return;
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}


function ensure_economy_user(client, guildid, userid){
  client.economy.ensure(`${guildid}-${userid}`, {
      user: userid,
      work: 0,
      balance: 0,
      bank: 0,
      hourly: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
      beg: 0,
      crime: 0,
      rob: 0,
      items: {
        yacht: 0, lamborghini: 0, car: 0, motorbike: 0,  bicycle: 0,
        nike: 0, tshirt: 0,
        mansion: 0, house: 0, dirthut: 0,
        pensil: 0, pen: 0, condom: 0, bottle: 0,
        fish: 0, hamster: 0, dog: 0, cat: 0,     
      },
      black_market: {
        boost: {
          time: 0,
          multiplier: 1
        }
      }
    })
    let data = client.economy.get(`${guildid}-${userid}`)
    //reset the blackmarket Booster if it's over!
    if(data.black_market.boost.time !== 0 && (86400000 * 2) - (Date.now() - data.black_market.boost.time) <= 0)
    {
      console.log(`Reset Multiplier from Black Market for: ${userid} | TIME: ${(86400000 * 2) - (Date.now() - data.black_market.boost.time)}`)
      client.economy.set(`${guildid}-${userid}`, 1, "black_market.boost.multiplier");
      client.economy.set(`${guildid}-${userid}`, 0, "black_market.boost.time");
    }  
      
}