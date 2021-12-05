const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
  name: "dm",
  category: "admin",
  aliases: ["dm"],
  cooldown: 10,
  usage: "dm <@User/@Role> <MESSAGE>",
  description: "Allows you to DM a USER or every USER of a ROLE",
  run: async (client, message, args, cmduser, text, prefix) => {
    try {
      if (message.member.hasPermission("ADMINSTRATOR")) {
        const user = message.mentions.members.first();
        if (!user) {
          return message.channel.send({
            embed: {
              color: 16734039,
              description: "You must mention member to send DM! message!",
            },
          });
        }
        const arguments = args.slice(1).join(" ");
        if (!arguments) {
          return message.channel.send({
            embed: {
              color: 16734039,
              description: `${emoji.error} You must enter text to send DM!`,
            },
          });
        }
        if (user.user.bot == false) {
          const embed = new MessageEmbed()
            .setTitle("Message from " + message.member.user.username + " (ID: " + message.member.user.id + ")")
            .setThumbnail(message.member.user.displayAvatarURL())
            .setDescription('> ' + arguments + "\n\n[Original message](https://discord.com/channels/" + message.guild.id + "/" + message.channel.id + "/" + message.id + ")")
          user.send(embed)
          return message.channel.send({
            embed: {
              color: 4779354,
              description: `${emoji.sucess} Message successfully send to <@` + user.user.id + ">",
            },
          });
        } else {
          return message.channel.send({
            embed: {
              color: 16734039,
              description: `${emoji.sucess} Sorry! I cant send DM messages to bots!`,
            },
          });
        }
      } else {
        return message.channel.send({
          embed: {
            color: 16734039,
            description: "You don't have premission to use the command! Required premission: `MANAGE_MESSAGES`",
          },
        });
      }
    } catch (err) {
      console.log(err);
      console.log(`${message}`)
      return message.channel.send({
        embed: {
          color: 16734039,
          description: `${emoji.error} Cant send this dm! Maybe user blocked their dm!`,

        },
      });
    }
  }
}
