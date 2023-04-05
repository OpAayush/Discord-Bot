const { SlashCommandBuilder } = require('discord.js');

module.exports = async (client, interaction, args) => {
  const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`);
  let rolesString = roles.join(', ');
  let rolesValue = rolesString;

  if (rolesString.length > 1700) {
    const remainingRoles = roles.slice(0, rolesString.lastIndexOf(',', 1699));
    const remainingRolesCount = roles.length - remainingRoles.length;
    rolesValue = remainingRoles.join(', ') + ` and **${remainingRolesCount}** more roles`;
  }

  const embed = {
    title: `Here is the list of roles in ${interaction.guild.name}`,
    footer: {
      text: `Server: ${interaction.guild.name}`
    },
    description: `${rolesValue}`,
  };

  await interaction.reply({ embeds: [embed] });
}
