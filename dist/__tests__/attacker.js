'use strict';

var _ = require('lodash');
var http = require('http');
var log = require('../log');
var TIME_PER_REQ = 200;
var NUMS_OF_REQ = 50;
/**
 * Xóa trộn quân bài
 * Xáo trộn và lấy tuần tự
 * Trả ra và test thử thôi
 * @param {array} array 
 */
var mang = ["2r", "2c", "2t", "2b", "3r", "3c", "3t", "3b", "4r", "4c", "4t", "4b", "5r", "5c", "5t", "5b", "6r", "6c", "6t", "6b", "7r", "7c", "7t", "7b", "8r", "8c", "8t", "8b", "9r", "9c", "9t", "9b", "0r", "0c", "0t", "0b", "jr", "jc", "jt", "jb", "qr", "qc", "qt", "qb", "kr", "kc", "kt", "kb", "ar", "ac", "at", "ab"];
function shuffle(array) {
  var m = array.length,
      t,
      i;
  // Chừng nào vẫn còn phần tử chưa được xáo trộn thì vẫn tiếp tục
  while (m) {
    // Lấy ra 1 phần tử
    i = Math.floor(Math.random() * m--);
    // Sau đó xáo trộn nó
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

function deal() {
  var layCards = function layCards(ar) {
    return JSON.stringify(ar).replace(/,|\]|\[|\"/g, '');
  };
  var xao = _.chunk(shuffle(mang), 13),
      // mang 4 pt
  // tao request 
  //The url we want is `www.nodejitsu.com:1337/`
  cards1 = layCards(xao[0]),
      cards2 = layCards(xao[1]),
      cards3 = layCards(xao[2]);
  // console.log(cards1)
  var options = {
    // host: 'dbwkr.herokuapp.com',
    host: 'localhost',
    port: 3100,
    headers: {
      'Content-Type': 'application/json'
    },
    path: '/poker?cards1=' + cards1 + '&cards2=' + cards2 + '&cards3=' + cards3
  };
  var done = function done(response) {
    var str = '';
    if (log.getFileSizeInBytes('__tests__/success.txt') == 4.0) log.clearFile('__tests__/success.txt');
    response.on('data', function (chunk) {
      str += chunk;
    });
    response.on('error', function (e) {
      return new Error(e);
    });
    response.on('end', function () {
      // log.appendLog('__tests__/success.txt', cards1 + '\t' + cards2 + '\t' + cards3 + '\n- Kết quả trả về -\n'
      //   + str + '\n' + '----------------------------\n');
    });
  };
  log.appendLog('__tests__/logAttackers.txt', '\n' + cards1 + '\t' + cards2 + '\t' + cards3 + '\n' + '----------------------------');
  http.request(options, done).end();
}

var runTest = function runTest() {
  var ii = setInterval(deal, TIME_PER_REQ);
  setTimeout(function () {
    return clearInterval(ii);
  }, TIME_PER_REQ * (NUMS_OF_REQ + 0.5));
};
runTest();