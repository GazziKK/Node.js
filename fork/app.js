const { fork } = require('child_process')
const forkProcess = fork('fork.js')

// також дуже цікава штука яка дозволяє створювати свого роду Subject like RxJs
//і кладе в глобальні переміні таким чином можна достувапатися до цих даних з любого місця свого проекта

forkProcess.on('message', (msg) => {
    console.log(`Get message ${msg}`);
})

forkProcess.on('close', (code) => {
    console.log(`Close code ${code}`);
})

forkProcess.send('Ping');