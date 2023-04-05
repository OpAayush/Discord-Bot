const { SlashCommandBuilder } = require('discord.js');

module.exports = async (client, interaction, args) => {
  const role = interaction.options.getRole('role');
  const newname = interaction.options.getString('name');

  const embed = {
    title: `Role renamed: ${role.name}`,
    fields: [
      {
        name: 'Old name',
        value: role.name,
      },
      {
        name: 'New name',
        value: newname,
      },
    ],
    footer: {
      text: `Renamed by ${interaction.user.tag}`
    },
  };

  await interaction.reply({ embeds: [embed] });

  await role.setName(newname);
}
