const { SlashCommandBuilder } = require('discord.js');
const { PermissionsBitField } = require('discord.js');

module.exports = async (client, interaction, args) => {
    const name = interaction.options.getString('name');
    const member = interaction.options.getUser('member');
    const color = interaction.options.getString('color');
    
    const permissions = ([
        PermissionsBitField.Flags.SendMessages, 
        PermissionsBitField.Flags.ViewChannel
])
    try {
        const role = await interaction.guild.roles.create({
            name: name,
            color: color,
            permissions: permissions.bitfield,
            reason: `New role created by ${interaction.user.tag}.`,
        });

        if (member) {
            await member.roles.add(role);
        }
        const embed = {
            title: `Role created: ${name}`,
            fields: [
                {
                    name: 'Name',
                    value: `\`\`\`yaml\n${name}\`\`\``,
                },
                {
                    name: 'Color',
                    value: `\`\`\`yaml\n${color.toUpperCase()}\`\`\``,
                },
                {
                    name: 'ID',
                    value: `\`\`\`css\n${role.id}\`\`\``,
                },
            ],
            footer: {
                text: `Created by ${interaction.user.tag}`
            },
        };
        await interaction.reply({ embeds: [embed] });
    } catch(error) {
        await interaction.reply({ content: '**Error**\nHere is something you have done wrong!\n#1 The hex color is wrong!\n#2 The name contains invalid characters!' })
    }
    
}
                   