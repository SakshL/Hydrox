const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const randomWords = require('random-words');
const emoji = require('../../emoji.json')
const word = randomWords();

module.exports = {
  name: "shuffle-guess",
  aliases: ["guess"],
  usage: "shuffle-guess",
  description: "Shuffle Guess Time!",
  category: "fun",
  run: async (bot, message, args) => {

    const res = await (await (fetch(`https://api.monkedev.com/fun/shuffle?content=${word}&key=EjLY54Vys5kJVWgcfaA1RjFIp`))).json();
    const firstbd = new MessageEmbed()
      .setTitle("Shuffled!")
      .setDescription("Now Try To Guess It!")
      .addField("Shuffle Word", `Type this shuffled word \`${res.result}\`\nOptions: \`cancel\`,\`reshuffle\``)
      .setColor("RANDOM")
      .setFooter("Thanks For Using Me");
    await message.channel.send(firstbd)
    const gameFilter = m => m.author.id
    const gameCollector = message.channel.createMessageCollector(gameFilter);

    gameCollector.on('collect', async msg => {
      const ggembed = new MessageEmbed()
        .setTitle("Nice!")
        .setDescription(`You made it Yay 🎉🎉. It was \`${word}\``)
        .setColor("#C3447A")
        .setFooter("Thanks For Using Me");
      if (msg.author.bot) return
      const selection = msg.content.toLowerCase();
      if (selection === word) {
        message.channel.send(ggembed)
        gameCollector.stop()
      } else if (selection === 'cancel') {
        const cancelbd = new MessageEmbed()
          .setTitle("Game Stopped!")
          .setColor("RED")
          .setFooter("Thanks For Using Me")
        message.channel.send(cancelbd)
        gameCollector.stop();
      } else if (selection === 'reshuffle') {
        const reshbd = new MessageEmbed()
          .setTitle("Shuffled!")
          .setDescription("Here's the word..Try another time to guess it!!")
          .addField("Shuffled Word", `Type it correctly - \`${res.result}\`\nOptions: \`cancel\`,\`reshuffle\``)
          .setColor("RANDOM")
          .setFooter("Thanks For Using Me");
        const ress = await (await (fetch(`https://api.monkedev.com/fun/shuffle?content=${word}&key=EjLY54Vys5kJVWgcfaA1RjFIp`))).json();
        message.channel.send(reshbd)
      } else if (selection !== word) {
        message.reply(`Wrong\nOptions: \`cancel\`,\`reshuffle\``)
      }
    });
  }
}