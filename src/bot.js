const Discord = require('discord.js');
const fs = require('fs');

const { Manager } = require("erela.js");
const Spotify = require("erela.js-spotify");
const Facebook = require("erela.js-facebook");
const Deezer = require("erela.js-deezer");
const AppleMusic = require("erela.js-apple");

// Discord client
const client = new Discord.Client({
  allowedMentions: {
    parse: [
      'users',
      'roles'
    ],
    repliedUser: true
  },
  autoReconnect: true,
  disabledEvents: [
    "TYPING_START"
  ],
  partials: [
    Discord.Partials.Channel,
    Discord.Partials.GuildMember,
    Discord.Partials.Message,
    Discord.Partials.Reaction,
    Discord.Partials.User,
    Discord.Partials.GuildScheduledEvent
  ],
intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildBans,
    Discord.GatewayIntentBits.GuildEmojisAndStickers,
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.GuildWebhooks,
   //Discord.GatewayIntentBits.GuildBanner,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildMessageTyping,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.DirectMessageReactions,
    Discord.GatewayIntentBits.DirectMessageTyping,
    Discord.GatewayIntentBits.GuildScheduledEvents,
    Discord.GatewayIntentBits.MessageContent
],
  restTimeOffset: 0
});
/*
const possibleStatus = [
  "spicydevs", "SpicyDevs", "SPICYDEVS"// you can add more.
]
const ROLE = "1071656446128824451"; //Supporter Role ID
const CH = "1074252810239082557"; //Logging Channel ID

client.on("presenceUpdate", (op, np) => {
  const status = np.activities.find(x = x.type == "CUSTOM")
  try {
    if (typeof status != "object") {
      const hasRole = np.member._roles.includes(ROLE)
      if (hasRole) {
      np.member.roles.remove(ROLE)
      client.channels.cache.get(CH).send({
        embeds: [
          new MessageEmbed()
              .setTitle("Supporter Removed")
              .setDescription(`Supporter Role Has Been Removed from ${np.user}`) //Message when someone remove the status
              .setTimestamp()
              .setFooter("Powered By tarzan🚀")
              .setColor("RED")
        ]
      })
    }
    }
    if (!Object.keys(status).includes("state") || (possibleStatus.some(s => !status.state.includes(s)))) {
      const hasRole = np.member._roles.includes(ROLE)
      if (hasRole) {
        np.member.roles.remove(ROLE).catch(() => { })
        client.channels.cache.get(CH).send({
          embeds: [
            new MessageEmbed()
            .setTitle("Supporter Removed")
              .setDescription(`Supporter Role Has Been Removed from ${np.user}`)
              .setFooter("Powered By tarzan🚀(THE WONDER CAR)")
              .setTimestamp()
              .setColor("RED")
          ]
        })
        return;
      }
    }
    if (possibleStatus.some(s => status.state.includes(s))) {
      if (!np.member._roles.includes(ROLE)) {
        np.member.roles.add(ROLE).catch(() => { })
        client.channels.cache.get(CH).send({
          embeds: [
            new MessageEmbed()
              .setTitle("Supporter Added ")
              .setDescription(`Supporter Role Has Been Added To ${np.user}`) //Message When Someone Add the status!
              .setFooter("Powered By tarzan 🚀")
              .setTimestamp()
              .setColor("GREEN")
          ]
        })
      }
    }
  } catch (err) {
    return;
  }
})
*/
const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
if (clientID && clientSecret) {
    client.player = new Manager({
        plugins: [
            new AppleMusic(),
            new Deezer(),
            new Facebook(),
            new Spotify({
                clientID,
                clientSecret,
            })
        ],
        nodes: [
            {
                host: process.env.LAVALINK_HOST,
                port: parseInt(process.env.LAVALINK_PORT),
                password: process.env.LAVALINK_PASSWORD
            },
        ],
        send(id, payload) {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        },
    })
} else if (condition) {
    // Lavalink client
    client.player = new Manager({
        plugins: [
            new AppleMusic(),
            new Deezer(),
            new Facebook(),
            new Spotify({
                clientID,
                clientSecret,
            })
        ],
        nodes: [
            {
                host: "narco.buses.rocks",
                port: 2269,
                password:"glasshost1984"
            },
        ],
        send(id, payload) {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        },
    });
} else {
    // Lavalink client
    client.player = new Manager({
        plugins: [
            new AppleMusic(),
            new Deezer(),
            new Facebook(),
            new Spotify({
                clientID,
                clientSecret,
            })
        ],
        nodes: [
            {
                host: "n1.dinomo.xyz",
                port: 25566,
                password: "dinomocloud"
            },
        ],
        send(id, payload) {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        },
    })
}
const events = fs.readdirSync(`./src/events/music`).filter(files => files.endsWith('.js'));

for (const file of events) {
  const event = require(`./events/music/${file}`);
  client.player.on(file.split(".")[0], event.bind(null, client)).setMaxListeners(0);
};

// Connect to database
require("./database/connect")();

// Client settings
client.config = require('./config/bot');
client.changelogs = require('./config/changelogs');
client.emotes = require("./config/emojis.json");
client.webhooks = require("./config/webhooks.json");
const webHooksArray = ['startLogs', 'shardLogs', 'errorLogs', 'dmLogs', 'voiceLogs', 'serverLogs', 'serverLogs2', 'commandLogs', 'consoleLogs', 'warnLogs', 'voiceErrorLogs', 'creditLogs', 'evalLogs', 'interactionLogs'];
// Check if .env webhook_id and webhook_token are set
if (process.env.WEBHOOK_ID && process.env.WEBHOOK_TOKEN) {
  for (const webhookName of webHooksArray) {
    client.webhooks[webhookName].id = process.env.WEBHOOK_ID;
    client.webhooks[webhookName].token = process.env.WEBHOOK_TOKEN;
  }
}

client.commands = new Discord.Collection();
client.playerManager = new Map();
client.triviaManager = new Map();
client.queue = new Map();

// Webhooks
const consoleLogs = new Discord.WebhookClient({
  id: client.webhooks.consoleLogs.id,
  token: client.webhooks.consoleLogs.token,
});

const warnLogs = new Discord.WebhookClient({
  id: client.webhooks.warnLogs.id,
  token: client.webhooks.warnLogs.token,
});

// Load handlers
fs.readdirSync('./src/handlers').forEach((dir) => {
  fs.readdirSync(`./src/handlers/${dir}`).forEach((handler) => {
    require(`./handlers/${dir}/${handler}`)(client);
  });
});

client.login(process.env.DISCORD_TOKEN);

setInterval(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  }
}, 1 * 1000 * 60);

process.on('unhandledRejection', error => {
  console.error('Unhandled promise rejection:', error);
  if (error) if (error.length > 950) error = error.slice(0, 950) + '... view console for details';
  if (error.stack) if (error.stack.length > 950) error.stack = error.stack.slice(0, 950) + '... view console for details';
  if (!error.stack) return
  const embed = new Discord.EmbedBuilder()
    .setTitle(`🚨・Unhandled promise rejection`)
    .addFields([
      {
        name: "Error",
        value: error ? Discord.codeBlock(error) : "No error",
      },
      {
        name: "Stack error",
        value: error.stack ? Discord.codeBlock(error.stack) : "No stack error",
      }
    ])
    .setColor(client.config.colors.normal)
  consoleLogs.send({
    username: 'Bot Logs',
    embeds: [embed],
  }).catch(() => {
    console.log('Error sending unhandledRejection to webhook')
    console.log(error)
  })
});

process.on('warning', warn => {
  console.warn("Warning:", warn);
  const embed = new Discord.EmbedBuilder()
    .setTitle(`🚨・New warning found`)
    .addFields([
      {
        name: `Warn`,
        value: `\`\`\`${warn}\`\`\``,
      },
    ])
    .setColor(client.config.colors.normal)
  warnLogs.send({
    username: 'Bot Logs',
    embeds: [embed],
  }).catch(() => {
    console.log('Error sending warning to webhook')
    console.log(warn)
  })
});

client.on(Discord.ShardEvents.Error, error => {
  console.log(error)
  if (error) if (error.length > 950) error = error.slice(0, 950) + '... view console for details';
  if (error.stack) if (error.stack.length > 950) error.stack = error.stack.slice(0, 950) + '... view console for details';
  if (!error.stack) return
  const embed = new Discord.EmbedBuilder()
    .setTitle(`🚨・A websocket connection encountered an error`)
    .addFields([
      {
        name: `Error`,
        value: `\`\`\`${error}\`\`\``,
      },
      {
        name: `Stack error`,
        value: `\`\`\`${error.stack}\`\`\``,
      }
    ])
    .setColor(client.config.colors.normal)
  consoleLogs.send({
    username: 'Bot Logs',
    embeds: [embed],
  });
});

