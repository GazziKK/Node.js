const { exec, spawn } = require('child_process')

// ця плюшка може виконувати команди в консолі і це ахуєно
const childProcess = exec('ls', (err, stdout, stderr) => {
    if (err) {
        console.error(err.message);
    }

    console.log(`stdout => ${stdout}`);
    console.log(`stderr => ${stderr}`);
})

childProcess.on('exit', (code) => {
    console.log('exit code',code)
})

//===================================
// те саме але код вихода буде в кінці так як ми підписуємся на події і по черзі показуєм результат
// такий підхід має плюси так як ми виконуєм все послідовно і маєм змогу реагувати на зміни і продовжувати роботу з башом
const childProcess2 = spawn('ls')

childProcess2.stdout.on('data', (data) => {
    console.log('Stdout code', data.toString())
})

childProcess2.stderr.on('err', (data) => {
    console.log('Stderr code',data)
})

childProcess2.on('exit',(code) => {
    console.log('exit code',code)
})