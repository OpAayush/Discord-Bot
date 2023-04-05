const { SlashCommandBuilder } = require('discord.js');

module.exports = async (client, interaction, args) => {
    const role = interaction.options.getRole('role');
    const color = interaction.options.getString('color');
    
    const embed = {
        title: `Role color changed to: ${role.color}`,
        fields: [
            {
                name: 'Name',
                value: role.name,
            },
            {
                name: 'Old color',
                value: role.hexColor.toUpperCase(),
            },
            {
                name: 'New color',
                value: color.toUpperCase(),
            },
        ],
        footer: {
            text: `Renamed by ${interaction.user.tag}`
        },
	};

    await interaction.reply({ embeds: [embed] });
    
    await role.setColor(color);
}
