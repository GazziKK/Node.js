#!/usr/bin/env node
import {getArgs} from './helpers/args.js';

const initCLI = () => {
    // таким чином можна подивитися які параметри ми передаєм при виклиці цього файла
    // свого роду так: node weather.js param1 param2
    const args = getArgs(process.argv)
    // а ось тут ми хедлимо передані параметри і виводимо щось в консоль
    if (args.h) {
        console.log('help');
    } 
    if (args.c) {
        console.log(`city ${args.c}`);
    }
    if (args.t) {
        console.log('token');
    }
}

initCLI();