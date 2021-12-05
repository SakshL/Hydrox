module.exports.run = async (client) => {
  client.on('clickButton', async (b) => {
        if(b.id !== "ticket") return;
       b.guild.channels.create(`${b.clicker.user.username} - ticket`, {
          permissionOverwrites: [
          {
            id: b.guild.roles.everyone,
            deny: ['VIEW_CHANNEL'],
          },{
            id: b.clicker.user.id,
            allow: ['VIEW_CHANNEL', `READ_MESSAGE_HISTORY`, `ATTACH_FILES`, `SEND_MESSAGES`],
          }
          ]
          }).then(async (channel) => {
            channel = channel
            const chembed = new MessageEmbed()
            .setAuthor(`<@${b.clicker.user.id}> Ticket!`)
            .setDescription(`Hey <@${b.clicker.id}> Thanks for opening ticket Some one help you soon!`)
            .setFooter(`Ticket For - ${b.clicker.user.username}`)
            .setColor('BLUE')
            .setTimestamp()
            let chbtn = new btn.MessageActionRow()
            .addComponents(delet);
            channel.send(`Welcome <@${b.clicker.id}> !`)
            channel.send(chembed, chbtn)
            const userch = channel.id;
            b.reply.send(`Your ticket Has Been Created In <#${userch}>`, true)
          })
          //
      })
      client.on('clickButton', async (h) => {
        if(h.id !== "delete") return;
        if(!h.clicker.member.hasPermission("ADMINISTRATOR")) return h.reply.send(`<@${h.clicker.id}> you can\`t do it`, true)
        //h.reply.defer();
    try{
        h.channel.send('Deleting channel in 10s').then(() => {
          h.channel.delete();
        })
        h.reply.defer();
    } catch (e) {
      console.log(e)
    }
})
}