const UrlsConfig = require("./../../database/models/UrlsConfig");
const { MessageEmbed, Client, Message } = require("discord.js");
const validUrl = require("valid-url");
const db = require('quick.db');
const emoji = require('../../emoji.json')

module.exports = {
  name: "remove",
  description: "*Removes Monitor From Your Project*.",
  aliases: ["dehost"],
  category: "uptime",
  botPermission: [],
  authorPermission: [],
  ownerOnly: false,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {string[]} args
   * @returns {Promise<any>}
   */
  run: async (client, message, args) => {
    const url = args[0];

    if (!url) {
      const urlsFilter = {
        authorID: message.author.id,
      };

      const all = await UrlsConfig.find(urlsFilter);
      const ps = db.get(`guild_${message.guild.id}_prefix`) || ',';
      if (all.length === 0) {
        return message.lineReply(new MessageEmbed()
        .setTitle('No projects!')
        .setDescription(`You can add project by using ${ps}add <url>`)
        .setTimestamp()
        )
      }

      let embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Select what project you wanna remove.");

      let length = all.length;
      const projects = sliceIntoChunks(all, 5);
      let projectCount = 0;
      let count = 0;
      const countConfig = new Map();
      let content = [];

      let currentPage = 0;

      projects[currentPage].forEach((doc) => {
        projectCount++;
        content.push(`**${projectCount}**. \`${doc.projectURL}\``);
        countConfig.set(projectCount, doc.projectURL);
      });

      embed.setDescription(content.join("\n"));

      const reactions = [
        { emoji: "◀", action: "back" },
        { emoji: "1️⃣", number: 1 },
        { emoji: "2️⃣", number: 2 },
        { emoji: "3️⃣", number: 3 },
        { emoji: "4️⃣", number: 4 },
        { emoji: "5️⃣", number: 5 },
        { emoji: "▶", action: "next" },
      ];

      let errors = false;
      const msg = await message.author.send(embed).catch((err) => {
        errors = true;
        if (err.message === "Cannot Send Messages To This User")
          message.lineReply(
            `<:error:872104702626639922> \`Cannot Send Message To You. Please Turn On Your Dms\`.`
          );
      });

      if (errors) return;

      message.lineReply("📥 Check your DM.");

      reactions.forEach(async (rec) => await msg.react(rec.emoji));

      const filter = (reaction, user) =>
        reactions.find((r) => r.emoji === reaction.emoji.name) &&
        user.id === message.author.id;

      const collector = msg.createReactionCollector(filter, { time: 150000 });

      collector.on("collect", async (reaction) => {
        switch (reaction.emoji.name) {
          case "1️⃣": {
            await UrlsConfig.findOneAndDelete({
              projectURL: countConfig.get(1),
            });
            let embed = new MessageEmbed()
              .setTitle("<:sucess:872104651179323432> Removed Succesfully!")
              .setDescription("Thanks for using me")
              .setColor("RANDOM")
              .setTimestamp();

            await message.author.send(embed);
            collector.stop();
            break;
          }

          case "2️⃣": {
            await UrlsConfig.findOneAndDelete({
              projectURL: countConfig.get(2),
            });
            let embed = new MessageEmbed()
              .setTitle("<:sucess:872104651179323432> Removed Succesfully!")
              .setDescription("Thanks for using me")
              .setColor("RANDOM")
              .setTimestamp();

            await message.author.send(embed);
            collector.stop();
            break;
          }

          case "3️⃣": {
            await UrlsConfig.findOneAndDelete({
              projectURL: countConfig.get(3),
            });
            let embed = new MessageEmbed()
              .setTitle("<:sucess:872104651179323432> Removed Succesfully!")
              .setDescription("Thanks for using me")
              .setColor("RANDOM")
              .setTimestamp();

            await message.author.send(embed);
            collector.stop();
            break;
          }

          case "4️⃣": {
            await UrlsConfig.findOneAndDelete({
              projectURL: countConfig.get(4),
            });
            let embed = new MessageEmbed()
              .setTitle("<:sucess:872104651179323432> Removed Succesfully!")
              .setDescription("Thanks for using me")
              .setColor("RANDOM")
              .setTimestamp();

            await message.author.send(embed);
            collector.stop();
            break;
          }

          case "5️⃣": {
            await UrlsConfig.findOneAndDelete({
              projectURL: countConfig.get(5),
            });
            let embed = new MessageEmbed()
              .setTitle("<:sucess:872104651179323432> Removed Succesfully!")
              .setDescription("Thanks for using me")
              .setColor("RANDOM")
              .setTimestamp();

            await message.author.send(embed);
            collector.stop();
            break;
          }

          case "◀": {
            if (currentPage !== 0) {
              currentPage = currentPage - 1;
              if (!projects[currentPage]) break;
              projectCount = 0;
              content = [];
              countConfig.clear();
              projects[currentPage].forEach((doc) => {
                projectCount++;
                content.push(`**${projectCount}**. \`${doc.projectURL}\``);
                countConfig.set(projectCount, doc.projectURL);
              });

              embed.setDescription(content.join("\n"));
              await msg.edit(embed);
              break;
            }
            break;
          }

          case "▶": {
            if (currentPage !== all.length) {
              currentPage = currentPage + 1;
              if (!projects[currentPage]) break;
              projectCount = 0;
              content = [];
              countConfig.clear();
              projects[currentPage].forEach((doc) => {
                projectCount++;
                content.push(`**${projectCount}**. \`${doc.projectURL}\``);
                countConfig.set(projectCount, doc.projectURL);
              });

              embed.setDescription(content.join("\n"));
              await msg.edit(embed);
              break;
            }
            break;
          }

          default:
            break;
        }
      });
      return;
    }

    if (!validUrl.isUri(url)) {
      return message.channel.send("<:error:872104702626639922> Please provide a vaild url!");
    }

    // LOADING
    let waitEmbed = new MessageEmbed().setDescription(
      "<a:HYPR_Loading:802069819842625556> Please wait..."
    );
    var messageAlert = await message.channel.send(message.author, waitEmbed);

    // CHECKS IF DATA EXSISTS
    var checkIfExsists = await UrlsConfig.findOne({
      projectURL: url,
      authorID: message.author.id,
    });

    // DATA HANDLING
    if (checkIfExsists === null) {
      // PROJECT IS NOT REGISTERED
      let embed = new MessageEmbed()
        .setTitle("<:LLdotwhite:793780355953065986> Project is not Registered!")
        .setDescription("Add one using: `,add <url>`")
        .setColor("#FF0000")
        .setTimestamp();

      await messageAlert.edit(embed);
      return message.delete();
    } else {
      // PROJECT IS REGISTERED

      // REMOVES THE DATA FROM DATABASE
      var storeIt = await UrlsConfig.findOneAndDelete({
        projectURL: url,
      }).then(async () => {
        // NOTIFIES WITH AN EMBED

        let new_pros = await client.projects.filter((p) => p !== url);
        client.projects = new_pros;

        let embed = new MessageEmbed()
          .setTitle("<:sucess:872104651179323432> Removed Succesfully!")
          .setDescription("Thanks For Using Me")
          .setColor("RANDOM")
          .setTimestamp();

        await messageAlert.edit(embed);
        return message.delete();
      });
    }
  },
};

/**
 *
 * @param {any[]} arr
 * @param {number} chunkSize
 * @returns {any[]}
 */
function sliceIntoChunks(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}
