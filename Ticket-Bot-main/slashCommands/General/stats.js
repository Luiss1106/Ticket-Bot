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
const utils = require("../../utils.js");

module.exports = {
    enabled: commands.General.Stats.Enabled,
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription(commands.General.Stats.Description),
    async execute(interaction, client) {
        let statsDB = client.globalStats.get(`${interaction.guild.id}`)

        const statsEmbed = new Discord.EmbedBuilder()
        statsEmbed.setTitle(config.Locale.guildStatistics)
        if(interaction.guild.iconURL()) statsEmbed.setThumbnail(interaction.guild.iconURL())
        statsEmbed.setColor(config.EmbedColors)

        statsEmbed.addFields([
          { name: `🎫 ${config.Locale.statsTickets}`, value: `> ${config.Locale.totalTickets} ${statsDB.totalTickets.toLocaleString('en-US')}\n> ${config.Locale.openTickets} ${statsDB.openTickets}\n> ${config.Locale.totalClaims} ${statsDB.totalClaims.toLocaleString('en-US')}\n> ${config.Locale.totalMessagesLog} ${statsDB.totalMessages.toLocaleString('en-US')}` },
          ]);

        if(config.TicketReviewSettings.Enabled) statsEmbed.addFields([
            { name: `⭐ ${config.Locale.ratingsStats}`, value: `> ${config.Locale.totalReviews} ${statsDB.totalReviews}\n > ${config.Locale.averageRating} ${utils.averageRating(client)}/5.0` },
          ]);

        if(config.SuggestionSettings.Enabled) statsEmbed.addFields([
            { name: `💡 ${config.Locale.suggestionStatsTitle}`, value: `> ${config.Locale.suggestionsTotal} ${statsDB.totalSuggestions}\n> ${config.Locale.suggestionsTotalUpvotes} ${statsDB.totalSuggestionUpvotes}\n> ${config.Locale.suggestionsTotalDownvotes} ${statsDB.totalSuggestionDownvotes}` },
          ]);

        statsEmbed.setTimestamp()
        statsEmbed.setFooter({ text: `Requested by: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
        interaction.reply({ embeds: [statsEmbed] })

    }

}