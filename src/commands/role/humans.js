const { SlashCommandBuilder } = require('discord.js');

module.exports = async (client, interaction, args) => {
  const role = interaction.options.getRole('role');

  const allmem = interaction.guild.members.cache;
    try {
        allmem.forEach(async member => {
            if (!member.user.bot) {
                await member.roles.add(role);
            }
        });
    } catch(error){
        await interaction.reply({ content: '**Error**\n#1 I am missing permisions\n#2 My role is not above the role selected\n#3 Does that role exist?' })
    }

  const embed = {
    title: `Role "${role.name}" has been given to all humans \`[NOT BOTS]\``,
    footer: {
      text: `Role given by ${interaction.user.tag}`
    },
  };

  await interaction.reply({ embeds: [embed] });
}