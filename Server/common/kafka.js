const __GLOBAL = require('./const.js');
const topic = __GLOBAL('KAFKA_TOPIC');
const kafkaClient = __GLOBAL('KAFKA_IPS');
const kafka = require('kafka-node');
const Producer = kafka.Producer;
const Consumer = kafka.Consumer;
let client;
let producer;
let consumer;

client = new kafka.Client(kafkaClient,__GLOBAL('KAFKA_CLIENT_ID'));
producer = new Producer(client);

// consumer = new Consumer(
//   client,
//   [{ topic: 'logi_anal_front', partition: 0 }]
// );

let message = {};

producer.on('ready', function () {

  var payloads = [{
    topic: topic,
    messages: message, // multi messages should be a array, single message can be just a string or a KeyedMessage instance
    key: __GLOBAL('KAFKA_KEY'), // only needed when using keyed partitioner
    partition: 0, // default 0
    attributes: 0 // default: 0
  }];
  producer.send(payloads, function (err, data) {
    //console.log(err);
  });


}).on('error',function(e) {
  //console.log('e');
});

module.exports = function (data){
  message = data;
}
