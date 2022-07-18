#!/usr/bin/env node
import {getArgs} from './helpers/args.js';
import { printError, printHelp, printSuccess } from './services/log.service.js';
import { saveKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
    try {
        await saveKeyValue('token', token)
        printSuccess('Token Saved')

    } catch(e) {
        printError('Token not save')
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
    if (args.c) {
        console.log(`city ${args.c}`);
    }
    if (args.t) {
        return saveToken(args.t)
    }
}

initCLI();