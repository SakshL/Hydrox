var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
module.exports = {
  name: "changename",
  category: "Owner",
  aliases: ["changebotname", "botname"],
  cooldown: 5,
  usage: "changename <NEW BOT NAME>",
  description: "Changes the Name of the BOT",
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: "745581095747059722", //Only allow specific Users to execute a Command [OPTIONAL]
  minargs: 1, // minimum args for the message, 0 == none [OPTIONAL]
  maxargs: 0, // maximum args for the message, 0 == none [OPTIONAL]
  minplusargs: 0, // minimum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  maxplusargs: 0, // maximum args for the message, splitted with "++" , 0 == none [OPTIONAL]
  argsmissing_message: "", //Message if the user has not enough args / not enough plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  argstoomany_message: "", //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    const wrongcolor = "RED"
    const color = "GREEN"
    try {
      if(message.author.id !== "745581095747059722") return console.log(message.author.username + " Is Trying To Changebotname!")
      //if args too long send error
      if (args.join(" ").length > 32){
        return message.reply(new MessageEmbed()
          .setColor(wrongcolor)
          .setFooter("wrong")
          .setTitle(`:x: Bot Name Too Long, Can't Have More Then 32 Letters!`)
        );
      }
      //set a user
      client.user.setUsername(args.join(" "))
        .then(user => {
          //send success message
          return message.reply(new MessageEmbed()
            .setColor(color)
            .setFooter("done")
            .setTitle(`Changed my Name to: \`${user.username}\``)
          );
        })
        .catch(e => {
          //send error message
          return message.reply(new MessageEmbed()
            .setColor(wrongcolor).setFooter("wrong")
            .setTitle(`:x: Something went Wrong`)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
          );
        });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.reply(new MessageEmbed()
          .setColor(wrongcolor)
          .setFooter("no")
          .setTitle(`❌ ERROR | An error occurred`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
      );
    }
  },
};