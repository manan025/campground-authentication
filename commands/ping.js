const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with I love :rabbit:!'),
	async execute(interaction) {
		await interaction.reply('I love :rabbit:!');
	},
};
