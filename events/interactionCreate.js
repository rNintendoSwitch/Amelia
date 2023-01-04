const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	once: false,
	// When an interaction happens...
	execute(interaction) {
		console.log(Date.now() + ` [INFO] ${interaction.user.tag} triggered an interaction in #${interaction.channel.name}`);
		const guild = interaction.guild;

		// If it's a button...
		if (interaction.isButton()) {
			// Find out who clicked the button
			const member = interaction.member;
			// Read the buttons customId
			const buttonID = interaction.customId;
			// The ID follows the format of type;idnumber, so split the customId and read the first half
			const buttonType = buttonID.split(';')[0];
			console.log(Date.now() + ' [INFO] ' + interaction.user.tag + ' clicked a button. Button type: ' + buttonType);
			// If it was a 'role' button...
			if (buttonType == 'role') {
				// Read the back half of the customId to get the roleID they requested
				const roleID = buttonID.split(';').pop();
				// Lookup that roleID to get its plaintext name
				const roleName = guild.roles.cache.get(roleID).name;
				console.log(Date.now() + ' [INFO] ' + interaction.user.tag + ' requested role "' + roleName + '" (' + roleID + ')');
				// If they already have the requested role, remove it
				if (member.roles.cache.has(roleID)) {
					member.roles.remove(roleID);
					console.log(Date.now() + ' [SUCCESS] Role "' + roleName + '" (' + roleID + ') removed from ' + interaction.user.tag);
					interaction.deferUpdate();
					const roleRemoved = new EmbedBuilder()
						.setColor('Blurple')
						.setDescription('Successfully opted out of "' + roleName + '" as requested.')
						.setFooter({ text: 'To opt back in or change additional notification preferences, visit #notification-roles' });
					interaction.user.send({ embeds: [roleRemoved] }).catch(console.warn);
				} else {
					// If they don't already have the requested role, assign it it
					member.roles.add(roleID);
					console.log(Date.now() + ' [SUCCESS] Role "' + roleName + '" (' + roleID + ') added to ' + interaction.user.tag);
					interaction.deferUpdate();
					const roleAdded = new EmbedBuilder()
						.setColor('Blurple')
						.setDescription('Successfully opted in to "' + roleName + '" as requested.')
						.setFooter({ text: 'To opt out or change additional notification preferences, visit #notification-roles' });
					interaction.user.send({ embeds: [roleAdded] }).catch(console.warn);
				}
			}
		}
	},
};