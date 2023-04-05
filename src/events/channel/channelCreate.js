const { ActionRowBuilder, ButtonBuilder, Discord, discord } = require('discord.js');

module.exports = async (client, channel) => {
    let types = {
        0: "Text Channel",
        2: "Voice Channel",
        4: "Category",
        5: "News Channel",
        10: "News Thread",
        11: "Public Thread",
        12: "Private Thread",
        13: "Stage Channel",
        14: "Category",
    }

    const logsChannel = await client.getLogs(channel.guild.id);
    if (!logsChannel) return;

/* let row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setEmoji("🔗")
                        .setLabel("Go to Channel")
                  .setURL(`https://discordapp.com/channels/${channel.guild.id}/${channel.id}`)
                        .setStyle(discord.ButtonStyle.Link),
                  ); */
  
    console.log(channel.type)
    client.embed({
        title: `🔧・Channel created`,
        desc: `A channel has been created`,
        fields: [
            {
                name: `> Name`,
                value: `- ${channel.name}`
            },
            {
                name: `> ID`,
                value: `- ${channel.id}`
            },
            {
                name: `> Category`,
                value: `- ${channel.parent}`
            },
            {
                name: `> Channel`,
                value: `- <#${channel.id}>`
            },
            {
                name: `> Type`,
                value: `- ${types[channel.type]}`
            }
          
        ],
    //  components: [row]
    }, logsChannel).catch(() => { })
};