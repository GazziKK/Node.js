//this code help calculate performance 
function slow() {
    //create mark
    performance.mark('start')
    const arr = [];
    for (let i = 0; i < 10000000; i++) {
        arr.push(i * i);

    }
    performance.mark('end');
    // set calculate between two marks 
    performance.measure('slow()', 'start', 'end')
}

slow();
// show some info about performance only time in ms
console.log(performance.getEntriesByName('slow()'));
console.log('=============================================================');

//create observeble for performance
const perf_hooks = require('perf_hooks')
const performanceObserver = new perf_hooks.PerformanceObserver((items, observer) => {
    console.log(items.getEntries());
    // get some entry
    const entry = items.getEntriesByName('slow()')
    console.log(entry);
    observer.disconnect();
    
})
//how observer can calculate
performanceObserver.observe({ entryTypes: ['measure', 'function']})


function slow() {
    performance.mark('start')
    const arr = [];
    for (let i = 0; i < 10000000; i++) {
        arr.push(i * i);

    }
    performance.mark('end');
    performance.measure('slow()', 'start', 'end')
}

slow();

//create performance without `mark`
test = perf_hooks.performance.timerify(test)

function test() {
    const arr = [];
    for (let i = 0; i < 10000000; i++) {
        arr.push(i * i);

    }
}
test()