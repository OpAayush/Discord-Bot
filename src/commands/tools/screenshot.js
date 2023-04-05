const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const puppeteer = require('puppeteer')

module.exports = async (client, interaction, args) => {
    const url = interaction.options.getString('url');

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0' });
        const screenshot = await page.screenshot({ type: 'png' });
        await interaction.followUp({ files: [ { attachment: screenshot, name: 'screenshot.png' } ] });
        await browser.close();
    } catch (error) {
        console.error(error);
        await interaction.followUp({ content: 'An error occurred while taking the screenshot.' });
    }
}
