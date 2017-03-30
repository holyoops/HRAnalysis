const topic = 'logi_anal_front';
const kafkaClient = '10.128.166.25:2181,10.128.166.27:2181,10.128.166.28:2181';
const kafka = require('kafka-node');
const Producer = kafka.Producer;
const Consumer = kafka.Consumer;
let client;
let producer;
let consumer;

client = new kafka.Client(kafkaClient,'clientID');
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
    key: 'theKey', // only needed when using keyed partitioner
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
