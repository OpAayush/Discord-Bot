const { SlashCommandBuilder } = require('discord.js');

module.exports = async (client, interaction, args) => {
  const role = interaction.options.getRole('role');
  const member = interaction.options.getMember('member');
    
try {
    await member.roles.add(role);
} catch(error){
    await interaction.reply({ content: '3 possible error\n#1 I am missing permisions\n#2 My role is not above the role selected\n#3 Does that role/member exist?' })
} 

  const embed = {
    title: `Success!`,
    description: `Role "${role.name}" has been given to ${member}`,
    footer: {
      text: `Role given by ${interaction.user.tag}`
    },
  };

  await interaction.reply({ embeds: [embed] });
}