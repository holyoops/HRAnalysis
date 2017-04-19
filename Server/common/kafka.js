const __GLOBAL = require('./const.js');
const topic = __GLOBAL('KAFKA_TOPIC');
const kafkaClient = __GLOBAL('KAFKA_IPS');
const kafka = require('kafka-node');
const Producer = kafka.Producer;
const Consumer = kafka.Consumer;

module.exports = function (data){

    let client;
    let producer;
    let consumer;

    client = new kafka.Client(kafkaClient,__GLOBAL('KAFKA_CLIENT_ID'));
    producer = new Producer(client);

    let message = data;

    producer.on('ready', function () {

        console.log((new Date()).toLocaleString(), 'KAFKA READY @',kafkaClient,' TOPIC: ',topic, '\n');
        if (message) {
            console.log((new Date()).toLocaleString(), 'KAFKA SENDING',message, '\n');
            var payloads = [{
                topic: topic,
                messages: message, // multi messages should be a array, single message can be just a string or a KeyedMessage instance
                key: __GLOBAL('KAFKA_KEY'), // only needed when using keyed partitioner
                partition: 0, // default 0
                attributes: 0 // default: 0
            }];
            producer.send(payloads, function (err, data) {
                if (err) {
                    console.log((new Date()).toLocaleString(), 'KAFKA SEND ERRROR: ', err, '\n');
                }else {
                    console.log((new Date()).toLocaleString(), 'KAFKA SEND SUCCESS: ',message, '\n');
                }

            });
        }

    }).on('error',function(e) {

        console.log((new Date()).toLocaleString(), 'KAFKA READY ERRROR:', e, '\n');

    });
}
