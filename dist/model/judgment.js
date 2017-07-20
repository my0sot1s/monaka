'use strict'; Object.defineProperty(exports, "__esModule", { value: true }); exports.soChi = undefined; var _cons = require('./cons'); var distance = _interopRequireWildcard(_cons); var _lodash = require('lodash'); var _lodash2 = _interopRequireDefault(_lodash); var _laws = require('./laws'); var _utils = require('./utils'); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } } var soChi = exports.soChi = function soChi(arr, enemy) { var tinhDiem2 = function tinhDiem2(item) { return Number(item[0]) + Number(item[1]) + Number(item[2]); }; var soMax = function soMax(item1, item2) { for (var i = 0; i < 3; i++) { if ((0, _utils.tinhDiem)(item1[i]) > (0, _utils.tinhDiem)(item2[i])) return false; } return true; }; var len = arr.length, _bo = [], temp; for (var i = 0; i < len; i++) { temp = taoBo(arr[i]); var run = false; for (var j = 0; j < 2; j++) { if (temp.soDiem[j] + 2 < temp.soDiem[j + 1]) { run = true;break; } } if (!run) _bo.push(temp); } len = _bo.length; for (var i = 0; i < len; i++) { for (var j = len - 1; j > i; j--) { var sd = _bo[j].soDiem, diem = tinhDiem2(sd); var sd2 = _bo[j - 1].soDiem, diem2 = tinhDiem2(sd2); if (diem2 < diem || diem2 === diem && soMax(_bo[j].max, _bo[j - 1].max)) { var temp = _bo[j]; _bo[j] = _bo[j - 1]; _bo[j - 1] = temp; } } } var soChiWin = function soChiWin(ene, item) { var win = 0; for (var k = 0; k < 3; k++) { win = item.soDiem[k] > ene.soDiem[k] ? win + 1 : win; if (item[k] === ene[k]) { if ((0, _utils.tinhDiem)(ene.max[k]) < (0, _utils.tinhDiem)(item.max[k])) win++; } } return win; }; return _bo; }; var taoBo = function taoBo(bo) { var checkChi = function checkChi(chi) { var bo2 = (0, _laws.timBo)(chi, 2), bo3 = (0, _laws.timBo)(chi, 3); if ((0, _laws.timBo)(chi, 4).length === 1) return distance.TUQUY;else if ((0, _laws.layThungs)(chi).length === 1 && (0, _laws.layXanhs)(chi).length === 1) return distance.THUNGXANH;else if (bo3.length === 1 && bo2.length === 1) return distance.CU;else if (bo3.length === 1 && bo2.length === 0) return distance.XAM;else if ((0, _laws.layThungs)(chi).length === 1) return distance.THUNG;else if ((0, _laws.layXanhs)(chi).length === 1) return distance.XANH;else if ((0, _laws.lay2Doi)(chi).length === 1) return distance.DOIDOI;else if ((0, _laws.layDoi)(chi).length === 1) return distance.DOI;else return distance.MAUTHAU; }; var soDiem = [], max = []; for (var i = 0; i < 3; i++) { var vt = checkChi(bo[i]); max.push(bo[i][0][0]); soDiem.push(vt + i + i); } return { item: bo, soDiem: soDiem, max: max }; }; var sortArr = function sortArr(arr) { var len = arr.length; if (len === 1 || len === 0) return arr; for (var i = 0; i < len - 1; i++) { if (arr[i].value < arr[i + 1].value) { var temp = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = temp; } } return arr; };