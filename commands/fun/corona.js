var Discord = require(`discord.js`)
const emoji = require('../../emoji.json')

module.exports = {
name : "corona",
run : async(client, message) => {
let user = message.mentions.members.first() || message.member;
let corona = Math.floor(Math.random() * 99) + 1
message.channel.send(`${user.user.username} , Have ${corona}% Corona!`)
}
}