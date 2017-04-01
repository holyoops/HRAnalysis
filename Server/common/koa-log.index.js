/**
 * Module dependencies.
 */
'use strict';

const Counter = require('passthrough-counter');
const humanize = require('humanize-number');
const bytes = require('bytes');
const chalk = require('chalk');

/**
 * TTY check for dev format.
 */

const isatty = process.stdout.isTTY;

/**
 * Expose logger.
 */

module.exports = dev;

/**
 * Color map.
 */

const colorCodes = {
  5: 'red',
  4: 'yellow',
  3: 'cyan',
  2: 'green',
  1: 'green',
  0: 'yellow'
};

/**
 * Development logger.
 */

function dev(opts) {
  return function logger(ctx, next) {
    // request
    const start = new Date;
    let rqID = uuid(16, 16);
    console.log('  '
      + chalk.green('%s')
      + ' ' + chalk.bold('>>>')
      + ' ' + chalk.cyan('%s')
      + ' ' + chalk.gray('%s')
      + ' ' + chalk.white('%s')
      + '\n    ' + chalk.gray('%s')
      + '\n',
        rqID,
        start.toLocaleString(),
        ctx.method,
        ctx.originalUrl,
        JSON.stringify(ctx.request.body));

    return next().then(function() {

      // calculate the length of a streaming response
      // by intercepting the stream with a counter.
      // only necessary if a content-length header is currently not set.
      const length = ctx.response.length;
      const body = ctx.body;
      let counter;
      if (null == length && body && body.readable) {
        ctx.body = body
          .pipe(counter = Counter())
          .on('error', ctx.onerror);
      }

      // log when the response is finished or closed,
      // whichever happens first.
      const res = ctx.res;

      const onfinish = done.bind(null, 'finish');
      const onclose = done.bind(null, 'close');

      res.once('finish', onfinish);
      res.once('close', onclose);

      function done(event){
        res.removeListener('finish', onfinish);
        res.removeListener('close', onclose);
        log(rqID, ctx, start, counter ? counter.length : length, null, event);
      }

    }, function(err) {
      // log uncaught downstream errors
      log(rqID, ctx, start, null, err);
      throw err;
    });

  }
}

/**
 * Log helper.
 */

function log(rqID, ctx, start, len, err, event) {
  // get the status code of the response
  const status = err
    ? (err.status || 500)
    : (ctx.status || 404);

  // set the color of the status code;
  const s = status / 100 | 0;
  const color = colorCodes[s];

  // get the human readable response length
  let length;
  if (~[204, 205, 304].indexOf(status)) {
    length = '';
  } else if (null == len) {
    length = '-';
  } else {
    length = bytes(len);
  }

  const upstream = err ? chalk.red('xxx')
    : event === 'close' ? chalk.yellow('-x-')
    : chalk.bold('<<<')

  console.log('  '
    + chalk.green('%s')
    + ' ' + upstream
    + ' ' + chalk.cyan('%s')
    + ' ' + chalk.gray('%s')
    + ' ' + chalk.white('%s')
    + ' ' + chalk[color]('%s')
    + ' ' + chalk.gray('%s')
    + ' ' + chalk.gray('size:%s')
    + '\n   ' + chalk.gray('%s')
    + '\n',
      rqID,
      start.toLocaleString(),
      ctx.method,
      ctx.originalUrl,
      status,
      time(start),
      length,
      JSON.stringify(ctx.body));
}

/**
 * Show the response time in a human readable format.
 * In milliseconds if less than 10 seconds,
 * in seconds otherwise.
 */

function time(start) {
  const delta = new Date - start;
  return humanize(delta < 10000
    ? delta + 'ms'
    : Math.round(delta / 1000) + 's');
}

function uuid(len, radix) {

  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;

  if (len) {
   // Compact form
   for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  } else {
   // rfc4122, version 4 form
   var r;

   // rfc4122 requires these characters
   uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
   uuid[14] = '4';

   // Fill in random data. At i==19 set the high bits of clock sequence as
   // per rfc4122, sec. 4.1.5
   for (i = 0; i < 36; i++) {
    if (!uuid[i]) {
     r = 0 | Math.random()*16;
     uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
    }
   }
  }

  return uuid.join('');
}
