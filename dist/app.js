'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _judgment = require('./model/judgment');

var _cons = require('./model/cons');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _laws = require('./model/laws');

var _utils = require('./model/utils');

var pip = _interopRequireWildcard(_utils);

var _log = require('./log');

var log = _interopRequireWildcard(_log);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('^^^^ Server Running ^^^^');
var app = (0, _express2.default)();
var PORT = process.env.PORT || 3100;
var fileName = 'public/log.txt';

// http://localhost:3100/poker?cards1=2c2rjb8b4r4t3c3t5t5bkb8c8r
// http://localhost:3100/poker?cards1=2c2r2b8b4r4t3c3tatabkb8c8r


//real

// http://localhost:3100/poker?cards1=4b3b2b0t9b8t8b6cabkrqcqbjb qc0t8t8t8b2b3b6cabrbqb9b4b
// http://localhost:3100/poker?cards1=3c2c2r0r0t9r9b7tacabkbjcjt   qc0t8t8t8b2b3b6cabrbqb9b4b
// http://localhost:3100/poker?cards1=4c4b4t9c9r8b7r5r0c0rkrqbjr
// http://localhost:3100/poker?cards1=5c2t2b9t7c7b4r4cabkrkbqt9r
// http://localhost:3100/poker?cards1=jb9tqb3c2c6c5r4c7rarqr3r6r
// http://localhost:3100/poker?cards1=ab2b8c3ckb4r9c4b5t3t2t7r7c


// Tạo bộ bài gồm có 52 quân
var POKERS = (0, _utils.createPokers)();

app.use(_express2.default.static(require('path').join(__dirname, 'public')));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(require('cors')()); //Allow CORS

app.all('*', require('./middleware').default);
app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'public/index.html'));
});

app.get('/log', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'public/log.txt'));
});

app.get('/poker', function (req, res) {
  var _req$query = req.query,
      cards1 = _req$query.cards1,
      cards2 = _req$query.cards2,
      cards3 = _req$query.cards3,
      debug = _req$query.debug;

  var cards = { cards1: cards1, cards2: cards2, cards3: cards3 },
      back = {},
      str = '',
      owns,
      enemy,
      owns = [],
      trimmer = [];

  if (cards1 && cards2 && cards3) {
    // Chuyển đổi định dạng quân bài
    for (var item in cards) {
      for (var j = 0; j < cards[item].length; j += 2) {
        owns.push(cards[item].substring(j, j + 2));
      }
    }
    // owns = getOwns(Object.values(data))
    // Tính ra 13 quân bài của enemy
    enemy = (0, _utils.getEnemy)(POKERS, owns);
    if (enemy !== 13) res.send('Bài nhập vào ko đúng');
    var ii = (0, _laws.moonOfShadow)(enemy);
    var _so = [];
    for (var i = 0; i < ii.length; i++) {
      _so = (0, _judgment.soChi)(_so, ii[i]);
    }
    enemy = _so[0];
    // debugger
  }
  // console.log(enemy)

  for (var item in cards) {
    // var pokers = sortByValue(cards[item].split('_'))
    if (!cards[item]) continue;
    var pokers = [];
    for (var j = 0; j < cards[item].length; j += 2) {
      pokers.push(cards[item].substring(j, j + 2));
    }

    pokers = (0, _utils.sortByValue)(pokers);
    if (pokers.length !== 13) res.send(new Error('Request có vấn đề vì t ko thể tìm đc đủ số quân bài !=13'));else {
      var temp = (0, _laws.timBinh)(pokers);
      if (temp) //back[item] = temp
        str.concat(str += '' + temp[2].toString().replace(/,/g, '') + temp[1].toString().replace(/,/g, '') + temp[0].toString().replace(/,/g, '') + '\r\n');else {
        //check tạm thời
        var ii = (0, _laws.moonOfShadow)(pokers);
        _so = (0, _judgment.soChi)(ii, enemy);
        var s0Len = _so.length;
        if (s0Len === 0) {
          log.appendLog('public/exceptions.txt', '' + req.query);
        }
        trimmer.push(_lodash2.default.clone(_so).splice(0, s0Len > 10 ? 10 : s0Len));
        ii = _so[0].item;
        back[item] = ii;
        str += '' + ii[2].toString().replace(/,/g, '') + ii[1].toString().replace(/,/g, '') + ii[0].toString().replace(/,/g, '') + '\r\n';
      }
    }
  }

  // work with file log
  if (log.getFileSizeInBytes(fileName) >= 2) log.clearFile(fileName);
  var logContent = (JSON.stringify(cards, null, 2) + '\r\n' + JSON.stringify(back, null, 2).replace(/\r\n|\s+/g, ' ') + '\r\n .............. \r\n').replace(/r/g, _cons.R).replace(/c/g, _cons.C).replace(/b/g, _cons.B).replace(/t/g, _cons.T);
  log.appendLog(fileName, logContent);
  if (debug) res.send(JSON.stringify(trimmer).replace(/\r\n|\s+/g, ''));else res.send(str);
});

// console.log(moonOfShadow(['ar', 'kb', 'jr', '0t', '9c', '9r', '9t', '8c', '7b', '5b', '4r', '3t', '3b']))// lỗi 2 đôi done!!!
// console.log(moonOfShadow(['ar', 'kb', 'qr', 'jt', '9c', '9r', '9t', '8b', '7c', '5b', '3b', '3t', '2c']))// ok done!!!
// console.log(moonOfShadow(['kb', 'qr', 'jt', '9c', '9r', '9t', '8b', '7c', '5b', '3b', '3t', '3c', '2c']))// lỗi tính thiếu con 
// console.log(moonOfShadow(['qc', '0r', '9c', '9r', '9t', '8b', '8t', '7b', '5b', '5r', '3c', '2c', '2t']))// bể 2 đôi lỗi binh lủng
// console.log(moonOfShadow(['ac', 'ab', 'kr', 'qc', 'qb', '0r', '9c', '9r', '8t', '7t', '5b', '4b', '3c']))// bài toán 3 dôi lỗi binh lủng
// console.log(moonOfShadow(sortByValue(['kb', '3c', '3t', '2c', '2r', '2b', '4r', '4t', '8b', '8c', '8r', 'at', 'ab'])))// bài toán 3 dôi lỗi binh lủng
// var binh = timBinh(['ac', 'kc', 'qc', 'jc', '0c', '9r', '8r', '7r', '6r', '5r', '5t', '3t', '2t'])
// if (binh)
//   console.log(binh)
// else console.log(` [ Đối phương ăn trắng ]`)


_http2.default.createServer(app).listen(PORT, function () {
  console.log('^^^ Moons started at ' + PORT + ' ^^^');
  console.log('+^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^+');
});