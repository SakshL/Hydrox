const Discord = require('discord.js');
const disbut = require("discord-buttons");
const { MessageMenuOption, MessageMenu } = require("discord-buttons");
const colors = require('./../../colors.json')
const emoji = require('../../emoji.json')


module.exports = {
  name: "howtouse",
   aliases: ["howtouse"],
  run: async (client, message, args ) => {
      //--------------------------------------S T A R T---------------------------------------

        const embed = new Discord.MessageEmbed()
        .setTitle('')
        .setFooter("Page Home\n"+ client.user.username + "", client.user.displayAvatarURL())
        .setImage(`https://i.ytimg.com/vi/qQab-oRY8gk/hqdefault.jpg`)
        .setColor(colors.uptime);

        const embed1 = new Discord.MessageEmbed()
        .setTitle('<:UPLogo:880786952205529169> How to Use Uptimer!')
        .addField("<:up1:866155257583501342> **Get the link**",
          "Our first step is to get the webpage link. You can find the code in the bottom or side of you repl.it(see screenshot below)! If you do not have this link, copy paste this code at the top of your `index.js` and run it again. \n ```https://pastebin.com/HJGhAUZf```"
        )
        .setImage(`https://media.discordapp.net/attachments/882316345633566723/882580850733105183/zHEE3HeJ2LoAAAAASUVORK5CYII.png?width=1281&height=621`)
      .setColor(colors.uptime);

        const embed2 = new Discord.MessageEmbed()
      .setTitle('<:UPLogo:880786952205529169> How to Use Uptimer!n')
      .addField("<:up1:866155257583501342> **Run the command**",
        "Our next step is to runn the command. The syntax of this command is `*add <repl_url>.` If done correcty the bot should give embed saying: \n ```Added Succesfully```"
      )
      .setImage(`https://media.discordapp.net/attachments/882316345633566723/882554797436329984/unknown.png?width=1273&height=177`)
      .setColor(colors.uptime);

        const embed3 = new Discord.MessageEmbed()
      .setTitle('<:UPLogo:880786952205529169> How to Use Uptimer!n')
      .addField("ㅤ<:up1:866155257583501342> **Other Commands**","Now that we have added your project, you can use other command such as `projects` `remove` `stats` and `total`. Below Is an image of the remove command")
      .setImage(`https://media.discordapp.net/attachments/882519020572659772/882555086864265227/unknown.png?width=809&height=229`)
      .setColor(colors.uptime);

        //-----------------------------OPTIONS----------------------

        let option1 = new MessageMenuOption()
        .setLabel('Step 1')
        .setEmoji('880786952205529169')
        .setValue('option1')

        let option2 = new MessageMenuOption()
        .setLabel('Step 2')
        .setEmoji('880786952205529169')
        .setValue('option2')

        let option3 = new MessageMenuOption()
        .setLabel('Step 3')
        .setEmoji('880786952205529169')
        .setValue('option3')
        
    let select = new MessageMenu()
        .setID('selector')
        .setPlaceholder('Click here to view the help menu!')
        .setMaxValues(1)
        .setMinValues(1)
        .addOptions(option1, option2, option3)

        //-----------------------------OPTIONS----------------------
    
    const Sendmenu = await message.channel.send(embed, select);

    const filter = ( button ) => button.clicker.user.id === message.author.id; //if only the message author click thenit will work
    let collector = Sendmenu.createMenuCollector(filter, { time : 100000 });

    collector.on("collect" , (b) => {
        if(b.values[0] == "option1") {
            Sendmenu.edit(embed1, select)
        }

        if(b.values[0] == "option2") {
            Sendmenu.edit(embed2, select)
        }

        if(b.values[0] == "option3") {
            Sendmenu.edit(embed3, select)
        }

        b.reply.defer();
    })

    collector.on("end", (b) => {
        Sendmenu.edit(`${emoji.error} This help menu is expired! Please retype the command to view again.`)
    })

    }
  };

