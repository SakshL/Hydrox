const UrlsConfig = require("./../../database/models/UrlsConfig");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const validUrl = require("valid-url");
const emoji = require('../../emoji.json')


module.exports = {
  name: "add",
  description: "*Adds Monitor To Your Project.*",
  aliases: ["host"],
  category: "uptime",
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  run: async (client, message, args) => {
    var url = args[0];

    // CHECKS THE URL IF PROVIDED OR WRONG
    message.react("<:no:880293644408594443>")
    if (!url) return message.lineReply(new MessageEmbed()
    .setTitle("<:error:872104702626639922> No Valid Url Provided!")
    .setDescription('\`\`\`Plese Provide Url To Add \`\`\`')
    .setColor("RED")
    .setTimestamp()
    )
    message.react(`${emoji.error}`)
    if (!validUrl.isUri(url)) {
      return message.lineReply(new MessageEmbed()
      .setTitle(`${emoji.error} No Valid Url Provided!`)
      .setDescription('\`\`\`plese provide valid url to add\`\`\`')
      .setColor('RED')
      .setTimestamp()
      );
    }

    // LOADING
    let waitEmbed = new MessageEmbed().setDescription(
      "<a:round_loading:849528119194157077> Please Wait..."
    );
    var messageAlert = await message.channel.send(message.author, waitEmbed);

    // CHECKS IF THE PROJECT IS ALREADY REGISTERED
    var checkIfExsists = await UrlsConfig.findOne({
      projectURL: url,
    });

    if (checkIfExsists === null) {
      // RUNS WHEN PROJECT IS NOT REGISTERED
      await UrlsConfig.create({
        authorID: message.author.id,
        projectURL: url,
        pinged: 0,
      }).then(async () => {
        // RUNS AFTER THE PROJECT STORES THE DATA IN DATABASE
        client.projects.push(url);
        try {
          // TRIES TO PING PROJECT
          await fetch(url);
        } catch (e) {
          // ERRORS HANDLING
          await UrlsConfig.findOneAndUpdate(
            { projectURL: url },
            { error: true, errorText: e.message },
            { new: true }
          );
          message.react(`${emoji.error}`)
          message.lineReply(new MessageEmbed()
          .setTitle(`${emoji.error}Fletching Error!`)
          .setDescription('\`\`\`Plese provide valid URL\`\`\`')
          .setColor("RED")
          .setTimestamp()
          );
        }

        // NOTIFIES WITH AN EMBED THAT PROJECT IS SUCCESSFULLY REGISTERED
        message.react(`${emoji.sucess}`)
        let embed = new MessageEmbed()
          .setTitle("<:sucess:872104651179323432> Added Succesfully!")
          .setDescription("Thanks For Using Me")
          .setColor("RANDOM")
          .setTimestamp();
        await messageAlert.edit(embed);
        return message.delete();
      });
    } else {
      // RUNS WHEN THE PROJECT IS ALREADY IN DATABASE
      message.react(`${emoji.error}`)
      let embed = new MessageEmbed()
        .setTitle(
          "<:dot:862783291655323668> Project is already Registered!"
        )
        .setDescription(
          "The Project You're Trying To Register Is Already In The Database"
        )
        .setColor("#FF0000")
        .setTimestamp();

      await messageAlert.edit(embed);
      return message.delete();

      const logs = '873980446776627272';
      const logch = client.channels.cache.get(logs);
      if(!logch) return;
      const lembed = new MessageEmbed()
      .setTitle(`${message.author}`)
      .setDescription(`New Project added`)
      .setTimestamp()
      logch.send(lembed)      
    }
  },
};
