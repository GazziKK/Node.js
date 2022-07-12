process.on('message', msg => {
    console.log(`fork get ${msg}`);
    process.send('Pong!')
    process.disconnect()
})