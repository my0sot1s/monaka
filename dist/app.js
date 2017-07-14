'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _laws = require('./model/laws');

var _utils = require('./model/utils');

var pip = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('^^^^ Server Running ^^^^');
// import data from '../data.json'

var app = (0, _express2.default)();
var PORT = process.env.PORT || 3100;

// Tạo bộ bài gồm có 52 quân
var pokers = (0, _utils.createPokers)();

app.use(_express2.default.static(require('path').join(__dirname, 'public')));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(require('cors')()); //Allow CORS

app.all('*', require('./middleware').default);
app.get('/', function (req, res) {
  res.sendfile(path.join(__dirname, 'public/index.html'));
});

app.get('/poker', function (req, res) {
  var _req$query = req.query,
      cards1 = _req$query.cards1,
      cards2 = _req$query.cards2,
      cards3 = _req$query.cards3;

  var cards = { cards1: cards1, cards2: cards2, cards3: cards3 },
      back = {},
      str = '';
  // // Chuyển đổi định dạng quân bài
  // var owns = getOwns(Object.values(data))
  // // Tính ra 13 quân bài của enemy
  // var enemy = getEnemy(pokers, owns)
  // // console.log(enemy)
  for (var item in cards) {
    // var pokers = sortByValue(cards[item].split('_'))
    var pokers = [];
    for (var j = 0; j < cards[item].length; j += 2) {
      pokers.push(cards[item].substring(j, j + 2));
    }
    pokers = (0, _utils.sortByValue)(pokers);
    if (pokers.length !== 13) res.send(new Error('Request có vấn đề vì t ko thể tìm đc đủ số quân bài !=13'));else {}
    var temp = (0, _laws.timBinh)(pokers);
    if (temp) //back[item] = temp
      str.concat(str += '' + temp[0].toString().replace(/,/g, '') + temp[1].toString().replace(/,/g, '') + temp[2].toString().replace(/,/g, '') + '\r\n');else {
      //check tạm thời
      // back[item] = moonOfShadow(pokers)[0]
      var ii = (0, _laws.moonOfShadow)(pokers)[0];
      // lay tra ra string
      str += '' + ii[0].toString().replace(/,/g, '') + ii[1].toString().replace(/,/g, '') + ii[2].toString().replace(/,/g, '') + '\r\n';
    }
  }
  res.send(str);
});
// var binh = timBinh(['ac', 'kc', 'qc', 'jc', '0c', '9r', '8r', '7r', '6r', '5r', '5t', '3t', '2t'])
// if (binh)
//   console.log(binh)
// else console.log(` [ Đối phương ăn trắng ]`)


_http2.default.createServer(app).listen(PORT, function () {
  console.log('*** Moons started at ' + PORT + ' ***');
  console.log('+*******************************+');
});