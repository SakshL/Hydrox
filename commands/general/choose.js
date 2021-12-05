
const { client, message } = require("discord.js");
const emoji = require('../../emoji.json')

const diceEmoji = ':game_die:';
const msgs = ["I choose ?!","I like ?!","I love ?!","? is the best choice","definitely ?!","? 100%"];

module.exports = {

    name: "choose",

    aliases:["pick", "decide"],

    args:"{item1} | {item2} | ...",

    description:"Let me decide a random option from a list of items! This command was created by PandaDasKissen",

    example:["owo pick dog | cat | mouse"],
    
    cooldown:5000,
    half:80,
    six:400,

    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Please Specify a text that you want to let bot choose it!')

        let items = args.join(" ").replace(/[,;]/gi,'|').split('|');

        if(items.length==1){
            return message.channel.send('Please Specify at least 2 text query!')
        }

        let item = items[Math.floor(Math.random()*items.length)];
        const msg = ', '+msgs[Math.floor(Math.random()*msgs.length)].replace('?','**'+item+'**');
        message.channel.send(diceEmoji + msg);
    }
};