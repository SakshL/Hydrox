const Discord = require("discord.js");
const beautify = require("beautify");
const config = require("../../config.json");
const emoji = require('../../emoji.json')
const allowners = ["745581095747059722", "440200028292907048", "506505845215985674", "729554449844011130"];

module.exports = {
 name: "eval",
 aliases: [],
 description: "Evaluates and runs JavaScript code",
 category: "General",
 usage: "eval <code>",
 run: async (client, message, args) => {
  try {
   if (!config.owners.some(r => r.includes(message.author.id))) {
    return message.channel.send({
     embed: {
      color: 16734039,
      description: "You do not have permission to run this command (Only owner of the bot can run this)!",
     },
    });
   }
   var result = args.join(" ");
   if (!result) {
    return message.channel.send({
     embed: {
      color: 16734039,
      description: "Please input code to evaluate!",
     },
    });
   }
   let evaluated = eval(result);
   console.log(result);
   const success = new Discord.MessageEmbed() // Prettier()
    .setColor("#303136")
    .setTitle("💡 Eval")
    .addField(`Input:\n`, "```js\n" + `${args.join(" ")}` + "```", false)
    .addField(`Output:\n`, "```js\n" + evaluated + "```", true)
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   message.channel.send(success);
  } catch (err) {
   const errormessage = new Discord.MessageEmbed() // Prettier()
    .setColor("#e31212")
    .setTitle("An error has occured")
    .addField(`Input:\n`, "```js\n" + `${result}` + "```", false)
    .addField(`Output:\n`, "```js\n" + `${err.message}` + "```", true)
    .setFooter(
     "Requested by " + `${message.author.username}`,
     message.author.displayAvatarURL({
      dynamic: true,
      format: "png",
      size: 2048,
     })
    );
   return message.channel.send(errormessage);
  }
 },
};