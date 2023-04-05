const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {

    const url = interaction.options.getString('url');
    const text = interaction.options.getString('text');

    if (text.length > 50) return client.errNormal({ error: "Your button text cannot be longer than 50 characters", type: 'editreply' }, interaction);

    let button = new Discord.ButtonBuilder()
        .setLabel(`${text}`)
        .setURL(`${url}`)
        .setStyle(Discord.ButtonStyle.Link);

    let row = new Discord.ActionRowBuilder()
        .addComponents(button)

    client.embed({
        title: `Minecraft Pocket Edition 1.19.60`,
        desc: `Click the button to Download!`,
        image: `https://cdn.discordapp.com/attachments/1058674319573651486/1072772895710908436/maxresdefault.jpg`,
        components: [row],
        type: 'editreply'
    }, interaction)

}

 