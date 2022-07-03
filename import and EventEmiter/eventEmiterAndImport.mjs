//дуже цікаий запис він створює обєкт з полями які можна імпортувати 
// файлика і можна до нього доступати через ключ і значення))
// import * as char from './characters.mjs';

// for (const i of char.characters) {
//     char.greet(i)
// }

// ============================================

// import log, { characters, greet} from "./characters.mjs";
// log()

// for (const i of characters) {
    // greet(i)
// }

// ============================================

// ASYNC IMPORT

// async function main() {
//     try {
//             const { characters, greet} = await import('./characters.mjs')
//         for (const i of characters) {
//             greet(i)
//         }
//     } catch(e) {
//         console.log('error', e);
//     }
// } 
// main();

//=================================================
// EventEmiter

// create events
import EventEmiter from 'events';
const myEmitter = new EventEmiter()

// create function for listener
const logBdConnection = () => {
    console.log('DB connected');
}

// create listener
myEmitter.addListener('connected', logBdConnection);

// send Event
myEmitter.emit('connected')

// Remove Listener for current emiter for all emiter use `myEmitter.removeAllListeners('connected');`
myEmitter.removeListener('connected', logBdConnection);

//this code not work because you unsubscribe above^^
myEmitter.emit('connect')

//add listener in top list listeners
myEmitter.prependListener('msg', (data) => console.log('Prepend event'))

//one more method for create emiter and send Event
myEmitter.on('msg', data => console.log(data))
myEmitter.emit('msg', 'Simple message')

// this option can ping one time not more
myEmitter.once('off', () => console.log('finish'))

// show liseners
console.log(myEmitter.getMaxListeners());

// set limit liseners
myEmitter.setMaxListeners(5)

//check how count listener wath event
console.log(myEmitter.listenerCount('msg'));

//check all liseners
console.log(myEmitter.listeners('msg'));

// show all events
// for example ['msg', 'off'] E.T.C
console.log(myEmitter.eventNames());

//error handling
// myEmitter.emit('error', new Error('Boom'))

// For Custom error
// myEmitter.on('error', err => console.log(err.message))

//  I coment code above because script stop working with error

//==============================================================
console.log('=============================');
// create EventTarget
const target = new EventTarget();
const  logTarget = () => {
    console.log('connected to target');
}
//create listener
target.addEventListener('connect', logTarget)
// dispatch event
target.dispatchEvent(new Event('connect'))