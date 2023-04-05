const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `📘・Owner information`,
        desc: `____________________________`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "👑┆Owner name",
            value: `Aayu5h`,
            inline: true,
        },
        {
            name: "🏷┆Discord tag",
            value: `Aayu5h#1737`,
            inline: true,
        },
        {
            name: "🏢┆Organization",
            value: `SpicyDevs`,
            inline: true,
        },
        {
            name: "🌐┆Website",
            value: `[https://spicydevs.me](https://spicydevs.me)`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 