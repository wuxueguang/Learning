const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

console.log(process.pid)
if(cluster.isMaster){
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
}


// if (cluster.isMaster) {
//     console.log('if')
//     // Keep track of http requests
//     let numReqs = 0;
//     setInterval(() => {
//         console.log(`numReqs = ${numReqs}`);
//     }, 1000);

//     // Count requests
//     function messageHandler(msg) {
//         if (msg.cmd && msg.cmd === 'notifyRequest') {
//             numReqs += 1;
//         }
//     }

//     // Start workers and listen for messages containing notifyRequest
//     const numCPUs = require('os').cpus().length;
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     for (const id in cluster.workers) {
//         cluster.workers[id].on('message', messageHandler);
//     }

// } else {
//     console.log('else')
//     // Worker processes have a http server.
//     http.Server((req, res) => {
//         res.writeHead(200);
//         res.end('hello world\n');

//         // Notify master about the request
//         process.send({
//             cmd: 'notifyRequest'
//         });
//     }).listen(8000);
// }