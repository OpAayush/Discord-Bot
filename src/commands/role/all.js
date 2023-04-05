const { SlashCommandBuilder } = require('discord.js');

module.exports = async (client, interaction, args) => {
  const role = interaction.options.getRole('role');

  const allmem = interaction.guild.members.cache;
  try {
    for (const member of allmem.values()) {
      await member.roles.add(role);
      // Delay of 1 second between each member
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    await interaction.reply({ content: '3 possible error\n#1 I am missing permisions\n#2 My role is not above the role selected\n#3 Does that role exist?' })
  }

  const embed = {
    title: `Role "${role.name}" has been given to all members`,
    footer: {
      text: `Role given by ${interaction.user.tag}`
    },
  };

  await interaction.reply({ embeds: [embed] });
}
