const axios = require('axios')
const qs = require('querystring');
const url = require('url')
const {SlashCommandBuilder} = require('discord.js');

// dev
const fs = require('node:fs');

function verify(i) {
    const username = i.options.getString('username').toString();
    const password = i.options.getString('password').toString();
    i.editReply(`Verifying ${username}`);
    /*
    After signing in
    i.editReply("Applied")
     */

    let cookie;

    axios.post('https://dpsdwarka.com/dpsdwarka/userform/misc/login.asp',
        qs.stringify({
                'txtuserid': username,
                'txtlogpass': password
            }
        ),
        {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cookie': ''
            }
        }
    )
        .then((response) => {
            fs.writeFileSync('response.html', response.data);

            cookie = response.headers['set-cookie'];

            console.log(`${cookie}, cookie final`)

            let html;
            axios.get('https://dpsdwarka.com/dpsdwarka/userform/MyGrpsite.asp', {
                headers: {
                    'Cookie': cookie[0].toString(),
                    'Connection': 'keep-alive'
                }
            })
                .then((response) => {
                    // extract the html from the response
                    html = response.data;
                    console.log(html);
                }, (error) => {
                    console.log(error);
                });
        }, (error) => {
            console.log(error);
        });


}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify to get verified role.')
        .addStringOption(options =>
            options
                .setName('username')
                .setDescription('Enter your username on dpsdwarka.com')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('password')
                .setDescription('Enter your password on dpsdwarka.com')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.reply({content: `Connecting...`, ephemeral: true});
        verify(interaction);
    },
};
