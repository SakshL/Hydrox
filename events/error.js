const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, message) => {
    console.error()
    const errorch = '874147565732499516'
    const channel = client.channels.cache.get(errorch);
    const errormsg = new MessageEmbed()
    .setTitle('an error occured')
    .setDescription(`${error}`)
    channel.send(errormsg)
}