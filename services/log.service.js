// this lib for change color in console
import chalk from 'chalk';
// this lib for remove extra space in console
import dedent from 'dedent-js';

const printError = (err) => {
    console.log(
        chalk.bgRed('ERROR ', err)
        );
}

const printSuccess = (res = '') => {
    console.log(
        chalk.bgGreen('SUCCESS ', res)
        );
}

const printHelp = () => {
    console.log(
         dedent(
            `${chalk.bgCyan('HELP ')}
            Without params I show Weather
            -s [CITY] for set City
            -h for display help
            -t [API_KEY] for safe Token`
         )
    );
} 

const printInfo = (info) => {
    console.log(
         dedent(
            `${chalk.bgCyan('INFO: ')}
            ${info}
            `
         )
    );
} 

export {printError, printSuccess, printHelp, printInfo};