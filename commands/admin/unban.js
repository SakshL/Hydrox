module.exports = {
  name: "unban",
  aliases: ["ub"],
  usage: "unban",
  description: "unbans member",
  run: async (client, message, args) => {
    const {member, mentions} = message
    const tag = `<@${member.id}`
      if (
        member.hasPermission('BAN_MEMBERS') ||
        member.hasPermission('ADMINISTRATOR')
      ) if (!args[0]) return message.channel.send(`${tag}> Please specify a user to unban!`);
      {
        const user = await message.channel.guild.members.unban(args[0]);
        return message.channel.send(`${user.tag} was unbanned`);

      }
        
      
  }
}