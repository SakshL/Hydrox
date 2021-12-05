const Nuggies = require('nuggies');
const chalk = require("chalk");
module.exports.run = async (client) => {
  console.log(chalk.blue(`${client.user.tag} has logged in.`));
  client.user.setActivity(`${client.users.cache.size} Members | ${client.guilds.cache.size} Server`);
  Nuggies.giveaways.startAgain(client);
};