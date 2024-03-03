/*
 _____  _             _______ _      _        _       
|  __ \| |           |__   __(_)    | |      | |      
| |__) | | _____  __    | |   _  ___| | _____| |_ ___ 
|  ___/| |/ _ \ \/ /    | |  | |/ __| |/ / _ \ __/ __|
| |    | |  __/>  <     | |  | | (__|   <  __/ |_\__ \
|_|    |_|\___/_/\_\    |_|  |_|\___|_|\_\___|\__|___/
                                        
Thank you for purchasing Plex Tickets!
If you find any issues, need support, or have a suggestion for the bot, please join our support server and create a ticket,
https://discord.gg/eRaeJdTsPY
*/

const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require ("discord.js")
const fs = require('fs');
const yaml = require("js-yaml")
const config = yaml.load(fs.readFileSync('./config.yml', 'utf8'))
const commands = yaml.load(fs.readFileSync('./commands.yml', 'utf8'))

module.exports = {
    enabled: commands.General.Help.Enabled,
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(commands.General.Help.Description),
    async execute(interaction) {

// command counts
let generalCount = 4
let ticketCount = 8
let utilityCount = 6


  let icon = interaction.guild.iconURL();
  let helpembed = new Discord.EmbedBuilder()
  helpembed.setTitle(`${config.HelpCommand.Title.replace(/{botName}/g, `${config.BotName}`)}`)
  if(!config.HelpCommand.EmbedColor) helpembed.setColor(config.EmbedColors)
  if(config.HelpCommand.EmbedColor) helpembed.setColor(config.HelpCommand.EmbedColor)

  helpembed.addFields([
    { name: `${config.HelpCommand.generalCategory.replace(/{cmdCount}/g, `${generalCount}`)}`, value: "``help``, ``ping``, ``suggest``, ``stats``" },
  ]);

  helpembed.addFields([
    { name: `${config.HelpCommand.ticketCategory.replace(/{cmdCount}/g, `${ticketCount}`)}`, value: "``add``, ``remove``, ``panel`` ``rename``, ``close``, ``pin``, ``delete``, ``alert``" },
  ]);

  helpembed.addFields([
    { name: `${config.HelpCommand.utilityCategory.replace(/{cmdCount}/g, `${utilityCount}`)}`, value: "``paypal``, ``crypto``, ``stripe``, ``calculate``, ``blacklist``, ``unblacklist``" },
  ]);

  if(config.HelpCommand.GuildIcon && icon) helpembed.setFooter({ text: `${config.HelpCommand.FooterMsg.replace(/{guildName}/g, `${interaction.guild.name}`).replace(/{userTag}/g, `${interaction.user.tag}`)}`, iconURL: `${icon}` })
  if(!icon) helpembed.setFooter({ text: `${config.HelpCommand.FooterMsg.replace(/{guildName}/g, `${interaction.guild.name}`).replace(/{userTag}/g, `${interaction.user.tag}`)}` })
  if(config.HelpCommand.FooterTimestamp) helpembed.setTimestamp();
  interaction.reply({ embeds: [helpembed] })

    }
}