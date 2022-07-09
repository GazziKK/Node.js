const { fork } = require('child_process');
const { performance, PerformanceObserver } = require('pref_hook');
const { Worker } = require('worker_threads');

// В цілому Тз наступне ми створимо якісь операції і ці операції виконаєм в work-threads i b fork
// суть в тому щоб навчитися переносити виконанна  якихось операцій в потоки і також замірити швидкість виконання
// цих чи інших функцій


// Таким чином ми створюєм обсервер який буде спостерігати і логувати перформанс наших операторів
const performanceObserver = new PerformanceObserver((items) => {
    // Дістаєм всі ентріси і проганняєм через цикл
    items.getEntries().forEach((entry) => {
        // Логами їх
        console.log(`${entry.name} : ${entry.duration}`);
    })
})
// Звісно обявляєм про них
performanceObserver.observe({ entryTypes: ['measure']})


const workerFunction = (array) => {
    return new Promise((resolve, reject) => {
        // Починаєм вимір і обявляєм назву відрізка
        performance.mark('worker start');
        // Створюєм сам воркер з силкою на файл з функціями які будуть виконути операції також прокидуєм якісь дані в цю функцію
        const worker = new Worker('/.worker.js', {
            workerData: { array }  
        });
        // підписуємся на подію і в калБеці ресолвимо проміс також задаємо заміри швидкості для Обсервабла перформанса
        worker.on('message', (msg) => {
            resolve(msg);
            performance.mark('worker end');
            performance.measure('worker', 'worker start', 'worker end')    
        })
    });
}

const forkFunction = (array) => {
    return new Promise((resolve, reject) => {
        performance.mark('fork start');
        // тут у нас приклад написання Форка нічого важкого відносно
        const forkProcess = new fork('./fork.js');
        forkProcess.send({ array });
        forkProcess.on('message', (msg) => {
            resolve(msg)
            performance.mark('fork end');
            performance.measure('fork', 'fork start', 'fork end')    
        })
    });
}
// І Звісно запускаєм це все в самому кінці обгортаєм все в проміси
const main = async () => {
    await workerFunction([25, 19, 48, 30])
    await forkFunction([25, 19, 48, 30])
}
main();


// В заключення скажу що Воркер відпрацює трішки швидше як Форк
// В цілому коли що використовувати 
// Worker не погано підійте якщо у нас великі дані для обміна і також часто відбувається комунікація
// Fork там де Мало комунікацій і малі Дані для обміну 

// в цілому краще використовувати worker і не мучитися над вибором чогось кращого 
// Звісно не треба забувати про слабкі сторони Звичайний дудос може убити процесор тому до Worker ставитися треба з обережністю