const { MessageEmbed } = require('discord.js')
const emoji = require('../../emoji.json')

module.exports = {
  name: "nuke",
  description: "Nukes a given channel",
  run: async (client, message, args) => {
    const { member, mentions } = message
    const tag = `<@${member.id}`
    const target = message.mentions.users.first();
    if (
      member.hasPermission('MANNAGE_CHANNEL')
    ) {
      let reason = args.join(" ") || "No Reason"
      if (!message.channel.deletable) {
        return message.reply("This channel cannot be nuked!")
      }
      let newchannel = await message.channel.clone()
      await message.channel.delete()
      let embed = new MessageEmbed()
        .setTitle(`${emoji.sucess} Channel Nuked`)
        .setDescription(reason)
        .setImage('https://images-ext-1.discordapp.net/external/20K8r4Uo1NxKuy2E9GgCd2OZ5VUw2FmxKY4_JxI9DrM/https/media.discordapp.net/attachments/832980836659494944/833749914336493638/boom.gif?width=450&height=450')
        .setTimestamp()
        .setColor("RANDOM");
      await newchannel.send(embed)
    } else {
      message.reply("You do not have permissions to use this command")
    }
  },
};