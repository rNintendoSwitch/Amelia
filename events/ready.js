const { ActivityType } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity('for announcements', { type: ActivityType.Watching });
		console.log(Date.now() + ` [READY] Logged in as ${client.user.tag}`);
	},
};