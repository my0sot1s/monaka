'use strict'; var _express = require('express'); var _express2 = _interopRequireDefault(_express); var _bodyParser = require('body-parser'); var _bodyParser2 = _interopRequireDefault(_bodyParser); var _http = require('http'); var _http2 = _interopRequireDefault(_http); var _path = require('path'); var _path2 = _interopRequireDefault(_path); var _judgment = require('./model/judgment'); var _cons = require('./model/cons'); var _lodash = require('lodash'); var _lodash2 = _interopRequireDefault(_lodash); var _laws = require('./model/laws'); var _utils = require('./model/utils'); var pip = _interopRequireWildcard(_utils); var _log = require('./log'); var log = _interopRequireWildcard(_log); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } console.log('^^^^ Server Running ^^^^'); var app = (0, _express2.default)(); var PORT = process.env.PORT || 3100; var fileName = 'public/log.txt'; app.use(_express2.default.static(require('path').join(__dirname, 'public'))); app.use(_bodyParser2.default.json()); app.use(_bodyParser2.default.urlencoded({ extended: false })); app.use(require('cors')()); app.all('*', require('./middleware').default); app.get('/', function (req, res) { res.sendFile(_path2.default.join(__dirname, 'public/index.html')); }); app.get('/log', function (req, res) { res.sendFile(_path2.default.join(__dirname, 'public/log.txt')); }); app.get('/exceptions', function (req, res) { res.sendFile(_path2.default.join(__dirname, 'public/exceptions.txt')); }); app.get('/poker', function (req, res) { var _req$query = req.query, cards1 = _req$query.cards1, cards2 = _req$query.cards2, cards3 = _req$query.cards3, debug = _req$query.debug; var cards = { cards1: cards1, cards2: cards2, cards3: cards3 }, back = {}, str = '', owns, enemy, enemyAfter, owns = [], trimmer = []; if (cards1 && cards2 && cards3) { for (var item in cards) { for (var j = 0; j < cards[item].length; j += 2) { owns.push(cards[item].substring(j, j + 2)); } } enemy = (0, _utils.getEnemy)(_cons.POKERS, owns); if (enemy.length !== 13) res.send('Bài nhập vào ko đúng'); enemy = (0, _utils.sortByValue)(enemy); var _so = (0, _judgment.soChi)((0, _laws.moonOfShadow)(enemy)); enemyAfter = _so[0]; } for (var item in cards) { if (!cards[item]) continue; var pokers = []; for (var j = 0; j < cards[item].length; j += 2) { pokers.push(cards[item].substring(j, j + 2)); } pokers = (0, _utils.sortByValue)(pokers); if (pokers.length !== 13) res.send('Request có vấn đề vì t ko thể tìm đc đủ số quân bài !=13'); else { var temp = (0, _laws.timBinh)(pokers); if (temp) str += '' + temp[2].toString().replace(/,/g, '') + temp[1].toString().replace(/,/g, '') + temp[0].toString().replace(/,/g, '') + '\r\n'; else { var ii = (0, _laws.moonOfShadow)(pokers); _so = (0, _judgment.soChi)(ii, enemyAfter); var s0Len = _so.length; if (s0Len === 0) { log.appendLog('public/exceptions.txt', JSON.stringify(req.query) + '\n'); } trimmer.push(_lodash2.default.clone(_so).splice(0, s0Len > 10 ? 10 : s0Len)); ii = _so[0].item; back[item] = { item: _so[0].item, win: _so[0].chiWin, winner: _so[0].winner, score: _so[0].soDiem }; str += '' + ii[2].toString().replace(/,/g, '') + ii[1].toString().replace(/,/g, '') + ii[0].toString().replace(/,/g, '') + '\r\n'; } } } if (enemy) { cards._enemy = enemy.toString().replace(/,/g, ''); back.enemy = enemyAfter.item; } if (log.getFileSizeInBytes(fileName) >= 2) log.clearFile(fileName); var logContent = (new Date() + '\n' + JSON.stringify(cards, null, 2) + '\n' + JSON.stringify(back, null, 2).replace(/\r\n|\s+/g, ' ') + '\r\n .............. \r\n').replace(/r/g, _cons.R).replace(/c/g, _cons.C).replace(/b/g, _cons.B).replace(/t/g, _cons.T).replace(/\]\s*\],/g, '] ],\n'); log.appendLog(fileName, logContent); if (debug) res.send(trimmer); else res.send(str); }); _http2.default.createServer(app).listen(PORT, function () { console.log('^^^ Moons started at ' + PORT + ' ^^^'); console.log('+^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^+'); });