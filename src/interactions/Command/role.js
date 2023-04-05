const { CommandInteraction, Client, SlashCommandBuilder, Permissions, PermissionsBitField } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Manage all server moderation')
      
    .addSubcommand(subcommand =>
                   subcommand
                   .setName('create')
                   .setDescription('Creates a new role with the given name and color.')
                   .addStringOption(option => 
                                    option.setName('name')
                                    .setDescription('The name of the new role.')
                                    .setRequired(true))
                   .addStringOption(option => 
                                    option.setName('color')
                                    .setDescription('The color of the new role.')
                                    .setRequired(true))
                   .addUserOption(option =>
                                  option.setName('member')
                                  .setDescription('The member to give the new role to.')))
    .addSubcommand(subcommand =>
                   subcommand
                   .setName('delete')
                   .setDescription('Deletes a role.')
                   .addRoleOption(option => 
                                    option.setName('role')
                                    .setDescription('The role to be delete.')
                                    .setRequired(true)))
    .addSubcommand(subcommand =>
                       subcommand
                       .setName('all')
                       .setDescription('Gives a certain role to all members.')
                       .addRoleOption(option => 
                                        option.setName('role')
                                        .setDescription('The to role to give to all members')
                                        .setRequired(true)))
    .addSubcommand(subcommand =>
                       subcommand
                       .setName('humans')
                       .setDescription('Gives a certain role to all humans. [not bots]')
                       .addRoleOption(option => 
                                        option.setName('role')
                                        .setDescription('The to role to give to humans')
                                        .setRequired(true)))
    .addSubcommand(subcommand =>
                       subcommand
                       .setName('bots')
                       .setDescription('Gives a certain role to all bot. [not humans]')
                       .addRoleOption(option => 
                                        option.setName('role')
                                        .setDescription('The to role to give to bot')
                                        .setRequired(true)))
    .addSubcommand(subcommand =>
                       subcommand
                       .setName('list')
                       .setDescription('Gives the list of roles in a server'))
    .addSubcommand(subcommand =>
                       subcommand
                       .setName('add')
                       .setDescription('Gives a certain role to a certain member.')
                       .addRoleOption(option => 
                                        option.setName('role')
                                        .setDescription('The to role to give to the members')
                                        .setRequired(true))
                  		.addUserOption(option => 
                                        option.setName('member')
                                        .setDescription('The member to give the role.')
                                        .setRequired(true)))
    .addSubcommand(subcommand =>
                       subcommand
                       .setName('remove')
                       .setDescription('Removes a certain role to a certain member.')
                       .addRoleOption(option => 
                                        option.setName('role')
                                        .setDescription('The to role to give to the members')
                                        .setRequired(true))
                  		.addUserOption(option => 
                                        option.setName('member')
                                        .setDescription('The member to give the role.')
                                        .setRequired(true)))
    .addSubcommand(subcommand =>
                       subcommand
                       .setName('rename')
                       .setDescription('Renames a certain role.')
                       .addRoleOption(option => 
                                        option.setName('role')
                                        .setDescription('The to role to re-name')
                                        .setRequired(true))
                  		.addStringOption(option => 
                                        option.setName('name')
                                        .setDescription('The new name for the role.')
                                        .setRequired(true)))
    .addSubcommand(subcommand =>
                       subcommand
                       .setName('color')
                       .setDescription('Re-sets a certain color role with hex.')
                       .addRoleOption(option => 
                                        option.setName('role')
                                        .setDescription('The to role to reset its color')
                                        .setRequired(true))
                  		.addStringOption(option => 
                                        option.setName('color')
                                        .setDescription('The color for the role')
                                        .setRequired(true)))
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
      if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            client.loadSubcommands(client, interaction, args);
        } else {
            await interaction.reply({
                content: "You don't have permission to use this command!",
                ephemeral: true
            });
        }
    },
};