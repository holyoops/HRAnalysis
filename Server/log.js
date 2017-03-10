let log = function(t, c, o, i){
  console.log(
  '\n' + t + ' start--------------------'
  + '\nDate:',new Date().toLocaleString()
  , '\nip:',i
  , '\ncontent:',c
  , '\norigin:',o
  , '\n' + t + ' end--------------------');
}

module.exports = function (t, c, o, i){
  let tag = t;
  let content = c;
  let origin = o;
  let ip = i;
  log(tag, content, origin, ip);
}
