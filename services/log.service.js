import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (err) => {
    console.log(
        chalk.bgRed('ERROR ', err)
        );
}

const printSuccess = (res) => {
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

export {printError, printSuccess, printHelp};