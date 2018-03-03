#!/usr/bin/env node

//Modules
const request = require('request');
const chalk = require('chalk');
const figlet = require('figlet');

//Customs
const log = console.log;
const mainTitle = figlet.textSync('ip lookup', { horizontalLayout: 'full' });
var suffix = process.argv.slice(2).join('+');

if (suffix.includes('-h' || '-help')) {
    log(chalk.cyan(`USAGE: >lookup <ip || domain> ~ example: ${chalk.underline('>lookup google.com')}`));
    process.exit();
}

if (!suffix) {
    log(chalk.red('IP-LOOKUP ERROR: Didn\'t provide a valid search term.'));
    log(chalk.cyan(`USAGE: >lookup <ip || domain> ~ example: ${chalk.underline('>lookup google.com')}`));
    process.exit();
}

process.on('unhandledRejection', (err) => {
    log(chalk.red(`IP-LOOKUP ERROR: an error occurred while searching for: ${suffix}\nIP-LOOKUP ERROR: ${err}`));
    process.exit();
});

if (!module.parent) {
    run();
}

function run() {
    try {
        log(chalk.yellowBright(mainTitle + '\n'));

        request(`http://json.geoiplookup.io/${suffix}`, function (error, response, body) {
            log(`   ${chalk.magenta.bold('IP lookup for')}   : ${suffix}`);
            log(`   ${chalk.green.bold('continent_code')}  : ${JSON.parse(body).continent_code || 'N/A'}`);
            log(`   ${chalk.green.bold('country_code')}    : ${JSON.parse(body).country_code || 'N/A'}`);
            log(`   ${chalk.green.bold('country_code3')}   : ${JSON.parse(body).country_code3 || 'N/A'}`);
            log(`   ${chalk.green.bold('country_name')}    : ${JSON.parse(body).country_name || 'N/A'}`);
            log(`   ${chalk.green.bold('region')}          : ${JSON.parse(body).region || 'N/A'}`);
            log(`   ${chalk.green.bold('city')}            : ${JSON.parse(body).city || 'N/A'}`);
            log(`   ${chalk.green.bold('postal_code')}     : ${JSON.parse(body).postal_code || 'N/A'}`);
            log(`   ${chalk.green.bold('latitude')}        : ${JSON.parse(body).latitude || 'N/A'}`);
            log(`   ${chalk.green.bold('longitude')}       : ${JSON.parse(body).longitude || 'N/A'}`);
            log(`   ${chalk.green.bold('dma_code')}        : ${JSON.parse(body).dma_code || 'N/A'}`);
            log(`   ${chalk.green.bold('area_code')}       : ${JSON.parse(body).area_code || 'N/A'}`);
            log(`   ${chalk.green.bold('isp')}             : ${JSON.parse(body).isp || 'N/A'}`);
            log(`   ${chalk.green.bold('org')}             : ${JSON.parse(body).org || 'N/A'}`);
            log(`   ${chalk.green.bold('hostname')}        : ${JSON.parse(body).hostname || 'N/A'}`);
            log(`   ${chalk.green.bold('cdn')}             : ${JSON.parse(body).cdn || 'N/A'}`);
            log(`   ${chalk.green.bold('success')}         : ${JSON.parse(body).success || 'N/A'}`);
            log(`   ${chalk.cyan.bold('status_code')}     : ${response.statusCode}\n`);
        });

    } catch(err) {
        log(chalk.red(err));
    }
}