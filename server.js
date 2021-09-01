const http = require('http');
const app = require('./src/app');
const keys = require('./src/config/keys');
const mongoose = require('mongoose');
const os = require('os');
const cluster = require('cluster');

const clusterWorkerSize = os.cpus().length;

const server = new http.Server(app);

const PORT = process.env.PORT || 5001;



mongoose
    .connect(keys.mongoConnectionString, { useNewUrlParser: true })
    .then(result => {
        console.log('Connected to database');
        if (clusterWorkerSize < 1) {  //change to > to run on all cores
            if (cluster.isMaster) {
                for (let i = 0; i < clusterWorkerSize; i++) {
                    cluster.fork();
                }

                cluster.on('exit', function(worker) {
                    console.log('Worker', worker.id, ' has exitted.');
                });
            } else {

                server.listen(PORT, function() {
                    console.log(`Express server listening on port ${PORT} and worker ${process.pid}`);
                });
            }
        } else {

        server.listen(PORT, function() {
            console.log(`Express server listening on port ${PORT} with the single worker ${process.pid}`);
        });
        }
    })
    .catch(err => console.log(err));
