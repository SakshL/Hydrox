const { Client, Message, MessageEmbed } = require('discord.js');
const emoji = require('../../emoji.json')

module.exports = {
    name: 'slowmode',
    aliases: [''], 
    description: 'Add Slowmode on channels',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      const amount = parseInt(args[0]);
    if (message.member.hasPermission("MANAGE_CHANNEL"))
      if (isNaN(amount))
        return message.reply(
          "<:error:872104702626639922> It doesn't seem to be valid number"
        );
    if (args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        message.reply("<:sucess:872104651179323432> slowmode is now " + amount + " seconds");
        return;
      } else {
        message.reply("<:sucess:872104651179323432> slowmode is now " + amount + " second");
        return;
      }
    }
    if (args[0] === amount + "min") {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
        message.reply("<:sucess:872104651179323432> slowmode is now " + amount + " minutes");
        return;
      } else {
        message.reply("<:sucess:872104651179323432> slowmode is now " + amount + " minute");

        return;
      }
    }
    if (args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        message.noMentionReply("<:sucess:872104651179323432> slowmode is now " + amount + " hours");
        return;
      } else {
        message.noMentionReply("<:sucess:872104651179323432> slowmode is now " + amount + " hour");
        return;
      }
    } else {
      message.reply("<:error:872104702626639922> You can only set seconds(s), minutes(min) and hours(h)");
    }
  },
};