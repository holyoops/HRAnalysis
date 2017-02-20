// kafka://10.128.166.25:2181,kafka://10.128.166.27:2181
var uuid = require('node-uuid');
var myID = uuid.v4();

const topic = 'logi_anal_front';
const kafkaClient = '10.128.166.25:2181,10.128.166.27:2181,10.128.166.28:2181';

var kafka = require('kafka-node'),
Producer = kafka.Producer,
client = new kafka.Client(kafkaClient,'clientID'),
producer = new Producer(client),
Consumer = kafka.Consumer,
consumer = new Consumer(
  client,
  [{ topic: 'logi_anal_front', partition: 0 }]
);

export function sendData(eventData) => {
  
}

producer.on('ready', function () {

  gets(function(reuslt){
    reuslt = reuslt.split('\n')[0];
    var message = '{"id":"' + myID + '","message": "' + reuslt + '"}';
    var payloads = [{
      topic: topic,
      messages: message, // multi messages should be a array, single message can be just a string or a KeyedMessage instance
      key: 'theKey', // only needed when using keyed partitioner
      partition: 0, // default 0
      attributes: 0 // default: 0
    }];
    producer.send(payloads, function (err, data) {
    });
  });

}).on('error',function(e) {
  console.log('e');
});

consumer.on('message', function (message) {
  var messageObj = JSON.parse(message.value);
  if (messageObj.id != myID){
    console.log(messageObj.id.split('-')[0]+'说：'+messageObj.message);
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});

function gets(cb){
  process.stdin.setEncoding('utf8');
  process.stdin.resume();
  process.stdin.on('data', function(chunk) {
    cb(chunk);
  });
}
