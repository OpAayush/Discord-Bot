const { SlashCommandBuilder } = require('discord.js');

module.exports = async (client, interaction, args) => {
  const role = interaction.options.getRole('role');
    
const embed = {
    title: 'Role Deleted',
    description: `Role has been successfully deleted.`,
  };
    
    try {
        await role.delete();
        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error(error);
        await interaction.reply('An error occurred while deleting the role.');
    }
};
