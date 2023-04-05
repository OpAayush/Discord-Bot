const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const members = await interaction.guild.members.fetch();

let row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setEmoji("🔗")
                        .setLabel("Open")
                        .setURL(`${interaction.guild.iconURL({ dynamic: true, size: 512 })}`)
                        .setStyle(Discord.ButtonStyle.Link),
                  );
  
  client.embed({
    title: `👤・Server Avatar`,
    desc: `avatar of the server`,
    image: (`${interaction.guild.iconURL({ dynamic: true, size: 512 })}`),
    type: 'editreply',
    components: [row]
  }, interaction)
}

   