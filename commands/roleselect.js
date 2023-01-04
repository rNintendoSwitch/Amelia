const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, SlashCommandBuilder } = require('discord.js');

// Build our embeds that contain the helper text
const rolePickerIntro = new EmbedBuilder()
	.setColor('Blue')
	.setDescription('**OPT-IN NOTIFICATION ROLES**\n\n**How it works**\nTo toggle notifications on or off for a given topic, click the buttons below.');

const rolePickerDiscord = new EmbedBuilder()
	.setColor('Blurple')
	.setDescription('**DISCORD RELATED NOTIFICATIONS**')
	.addFields(
		{ name: 'Announcements', value: 'Community updates from the chat moderation team.' },
		{ name: 'Game Nights', value: 'Come play games with fellow community members in a relaxed social setting. Voice chat encouraged but not required.' },
		{ name: 'Tournaments', value: 'Compete for bragging rights, and sometimes prizes.' },
		{ name: 'Weekly Trivia', value: 'Test your knowledge for a chance to unlock a background and/or trophy for your `!profile` card.' },
		{ name: 'Everybody Votes', value: 'Daily polls, frequently featuring questions submitted by the community.' },
	);

const rolePickerEvents = new EmbedBuilder()
	.setColor('#992D22')
	.setDescription('**LIVE EVENT RELATED NOTIFICATIONS**')
	.addFields(
		{ name: 'Nintendo Directs', value: 'Pre-recorded presentations produced by Nintendo focused on major announcements.' },
		{ name: 'Indie World Showcases', value: 'Pre-recorded presentations produced by Nintendo focused on indie games.' },
		{ name: 'Community Twitch', value: 'Live streams hosted by members of the Discord and Subreddit moderation teams on [our Twitch channel](https://twitch.tv/rNintendoSwitch). These are usually casual game nights or charity events in support of Childrens Miracle Network Hospitals.' },
	);

const rolePickerReddit = new EmbedBuilder()
	.setColor('#1F8B4C')
	.setDescription('**SUBREDDIT RELATED NOTIFICATIONS**')
	.addFields(
		{ name: 'Announcements', value: 'Community updates from the subreddit moderation team.' },
		{ name: 'MegaThreads', value: 'Posts focused on a particular topic or event such as a review embargo lifting, a games release, or a live event. ' },
		{ name: 'AMAs', value: 'Ask Me Anything style Q&A sessions with game publishers, game developers, and other notable figures or companies. ' },
	);

// Build our rows of buttons
const btnRow_Discord = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('role;1000858802544971817')
			.setLabel('Announcements')
			.setStyle('Primary'),
		new ButtonBuilder()
			.setCustomId('role;1000858852935348335')
			.setLabel('Game Nights')
			.setStyle('Primary'),
		new ButtonBuilder()
			.setCustomId('role;1000858949576298576')
			.setLabel('Tournaments')
			.setStyle('Primary'),
		new ButtonBuilder()
			.setCustomId('role;1000858980588998666')
			.setLabel('Weekly Trivia')
			.setStyle('Primary'),
		new ButtonBuilder()
			.setCustomId('role;1002588431769141328')
			.setLabel('Everybody Votes')
			.setStyle('Primary'),
	);
const btnRow_Events = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('role;1000859028903174154')
			.setLabel('Nintendo Directs')
			.setStyle('Secondary'),
		new ButtonBuilder()
			.setCustomId('role;1000859062935752745')
			.setLabel('Indie World Showcases')
			.setStyle('Secondary'),
		new ButtonBuilder()
			.setCustomId('role;1000859108603342948')
			.setLabel('Community Twitch')
			.setStyle('Secondary'),
	);
const btnRow_Reddit = new ActionRowBuilder()
	.addComponents(
		new ButtonBuilder()
			.setCustomId('role;1000859144397525093')
			.setLabel('Announcements')
			.setStyle('Success'),
		new ButtonBuilder()
			.setCustomId('role;1000859184075657286')
			.setLabel('MegaThreads')
			.setStyle('Success'),
		new ButtonBuilder()
			.setCustomId('role;1000859226211618869')
			.setLabel('AMAs')
			.setStyle('Success'),
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roleselect')
		.setDescription('Displays an embed that allows the user to opt-in to roles.')
		.setDMPermission(false)
		.setDefaultMemberPermissions(0),
	async execute(interaction) {
		// When the slash command is run, output the embeds and buttons into the channel
		await interaction.reply({ content: 'Sending role selection embed...', ephemeral: true });
		await interaction.channel.send({ embeds: [rolePickerIntro] });
		await interaction.channel.send({ embeds: [rolePickerDiscord], components: [btnRow_Discord] });
		await interaction.channel.send({ embeds: [rolePickerEvents], components: [btnRow_Events] });
		await interaction.channel.send({ embeds: [rolePickerReddit], components: [btnRow_Reddit] });
		console.log(Date.now() + ' [SUCCESS] ' + interaction.user.tag + ' sent role selection embeds to ' + interaction.channel.name);
	},
};