#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather } from './services/api.service.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Field Token EMPTY')
        return ;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Token Saved')

    } catch(e) {
        printError('Token not save')
    }

}

const saveCity = async (city) => {
    if (!city.length) {
        printError('Field City EMPTY')
        return ;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('City Saved')

    } catch(e) {
        printError('City not save')
    }

}

const getForecast = async () => {
    try {
        const weather = await getWeather();
        console.log(weather);
    } catch(err) {
        if (err?.response?.status === 404) {
            console.log(err);
            printError(err.response.statusText + ' ' + 'City')
        } else if (err?.response?.status === 401) {
            printError(err.message)
        } else {
            printError(err.message)
        }
    }
}

const initCLI = () => {
    // таким чином можна подивитися які параметри ми передаєм при виклиці цього файла
    // свого роду так: node weather.js param1 param2
    const args = getArgs(process.argv)
    // а ось тут ми хедлимо передані параметри і виводимо щось в консоль
    if (args.h) {
        printHelp();
    } 
    if (args.t) {
        return saveToken(args.t)
    }
    if (args.s) {
        return saveCity(args.s)
    }
    return getForecast();

}

initCLI();