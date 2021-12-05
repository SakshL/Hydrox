const Discord = require("discord.js");
const { createCanvas, loadImage } = require('canvas')
const emoji = require('../../emoji.json')

module.exports = {
  name: 'whatsapp',
  run : async(client, message, args, prefix) => {

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) ||
      message.author

    const avatar = await loadImage(
      user.displayAvatarURL({ format: "png" })
    );
    const canvas = createCanvas(800, 800);
    const ctx = canvas.getContext("2d");
    const background = await loadImage(
      "https://cdn.discordapp.com/attachments/821168411978629120/830951165943480359/whatsapp.png"
    );
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      `${user.username}_whatsapp.png`
    );

    message.channel.send(attachment);

  }
}