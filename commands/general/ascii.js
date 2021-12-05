const Discord = require('discord.js')
const figlet = require('figlet')
const emoji = require('../../emoji.json')

module.exports = {
    name: "ascii",
    description: "ascii font",
    cooldown: 3,
    
    async run (client, message, args) {


      //code

figlet.text(
     args.join(" "),
     {
       font: "",
     },
     async (err, data) => {
       message.channel.send(`\`\`\`${data}\`\`\``)
     }

   )
}


    }

