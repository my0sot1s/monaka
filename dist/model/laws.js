'use strict'; Object.defineProperty(exports, "__esModule", { value: true }); exports.moonOfShadow = exports.layMauThau = exports.layDoi = exports.laySam = exports.lay2Doi = exports.layCuLu = exports.layTu = exports.layXanhs = exports.layThungs = exports.timBinh = exports.checkXanhRong = exports.check3Thung = exports.timBo = undefined; var _utils = require('./utils'); var _lodash = require('lodash'); var _lodash2 = _interopRequireDefault(_lodash); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } var _bai = ['a', 'k', 'q', 'j', '0', '9', '8', '7', '6', '5', '4', '3', '2']; var timBo = exports.timBo = function timBo(chi, bo) { var str = chi.toString(); var _mang = [], len = str.length; for (var i = 0; i < len; i += 3) { var _bo = str.match(new RegExp(str[i] + '[r,c,b,t]', 'g')) || []; if (_bo.length === bo) { _mang.push(_bo); str = str.replace(new RegExp(str[i] + '[r,c,b,t],', 'g'), '');len = str.length;i = 0; } } return _mang; }; var _thung = []; var check3Thung = exports.check3Thung = function check3Thung(chi) { var sorted = (0, _utils.sortBySymbol)(chi); if (sorted.length === 2 && (sorted[0].length / sorted[1].length === 5 / 8 || sorted[0].length / sorted[1].length === 8 / 5)) { sorted[0] = (0, _utils.sortByValue)(sorted[0]); sorted[1] = (0, _utils.sortByValue)(sorted[1]); for (var i = 0; i < 2; i++) { var temp = []; if (sorted[0].length === 8) { if ((0, _utils.tinhDiem)(sorted[0][0][0]) > (0, _utils.tinhDiem)(sorted[1][0][0])) { temp = _lodash2.default.chunk(sorted[0], 5); return [temp[0], sorted[1], temp[1]]; } else { temp = _lodash2.default.chunk(sorted[0], 5); return [sorted[1], temp[0], temp[1]]; } } else { if ((0, _utils.tinhDiem)(sorted[0][0][0]) > (0, _utils.tinhDiem)(sorted[1][0][0])) { temp = _lodash2.default.chunk(sorted[1], 5); return [sorted[0], temp[0], temp[1]]; } else { temp = _lodash2.default.chunk(sorted[1], 5); return [temp[0], sorted[0], temp[1]]; } } } } if (sorted.length === 3) { var check = (sorted[0].length / sorted[1].length / sorted[2].length).toFixed(3); if (check === '0.333' || check === '0.120') { sorted[0] = (0, _utils.sortByValue)(sorted[0]); sorted[1] = (0, _utils.sortByValue)(sorted[1]); sorted[2] = (0, _utils.sortByValue)(sorted[2]); var temp = [null, null, null]; for (var i = 0; i < 3; i++) { if (sorted[i].length === 5 && temp[0] === null) temp[0] = sorted[i];else if (sorted[i].length === 5 && temp[0] !== null) temp[1] = sorted[i];else temp[2] = sorted[i]; } if ((0, _utils.tinhDiem)(temp[0][0][0]) < (0, _utils.tinhDiem)(temp[1][0][0])) { var temp2 = temp[0]; temp[1] = temp[0]; temp[0] = temp2; } return temp; } } return false; }; var checkXanhRong = exports.checkXanhRong = function checkXanhRong(chi) { var _chi = (0, _utils.sortByValue)(chi); var str = _chi.toString(); for (var i = 0, j = 0; i < str.length, j < 13; i += 3, j++) { if (str[i] !== _bai[j]) return false; } return _lodash2.default.chunk(_chi, 5); }; var timBinh = exports.timBinh = function timBinh(chi) { var binh = checkXanhRong(chi); if (binh) return binh; binh = check3Thung(chi); if (binh) return binh; var check = timBo(chi, 2); if (check.length === 6) { return check; } return null; }; var timThung = function timThung(mang) { var th = [0], all = [], len = mang.length; function xuat(mang, th, k) { var _mang = []; for (var i = 1; i <= k; i++) { _mang[i - 1] = mang[th[i] - 1]; } all.push(_mang); } function tohop(mang, vt, n, k) { for (var j = th[vt - 1] + 1; j <= n - k + vt; j++) { th[vt] = j; vt === k ? xuat(mang, th, k) : tohop(mang, vt + 1, n, k); } } tohop(mang, 1, len, 5); return all; }; var layThungs = exports.layThungs = function layThungs(mang) { var _mang = (0, _utils.sortBySymbol)(mang); var thungs = []; for (var i = 0; i < _mang.length; i++) { if (_mang[i].length < 5) continue;else if (_mang[i].length === 5) thungs.push(_mang[i]);else thungs.push.apply(thungs, _toConsumableArray(timThung(_mang[i]))); } return thungs; }; var timXanhs = function timXanhs(mang) { var xanh = [], x = []; var taoXanh = function taoXanh(xx) { if (xx.length === 5) xanh.push(xx); }; var timXanh = function timXanh(mang, vt) { if (Array.isArray(mang[vt])) { for (var i = 0; i < mang[vt].length; i++) { x[vt] = mang[vt][i]; if (vt === 4) xanh.push(_lodash2.default.clone(x));else timXanh(mang, vt + 1); } } else { x[vt] = mang[vt]; if (vt === 4) xanh.push(_lodash2.default.clone(x));else timXanh(mang, vt + 1); } }; timXanh(mang, 0); return xanh; }; var layXanhs = exports.layXanhs = function layXanhs(mang) { var locXanh = function locXanh(mang) { var _mang = [], len = mang.length; if (len < 10) { var vt = 0; while (vt + 5 <= len) { _mang.push(_lodash2.default.clone(mang).splice(vt, 5)); vt++; } } else { _mang.push.apply(_mang, [mang.splice(0, 5)].concat(_toConsumableArray(timXanh(mang)))); } return _mang; }; var _xanh = [], temp = [], len = mang.length; for (var i = 0; i < len - 1; i++) { if (i === 0) temp.push(mang[i]); if ((0, _utils.tinhDiem)(mang[i][0]) === (0, _utils.tinhDiem)(mang[i + 1][0]) + 1) temp.push(mang[i + 1]);else if ((0, _utils.tinhDiem)(mang[i][0]) === (0, _utils.tinhDiem)(mang[i + 1][0])) { var p = temp.pop(); if (Array.isArray(p)) temp.push([].concat(_toConsumableArray(p), [mang[i + 1]]));else temp.push([p, mang[i + 1]]); } else { if (temp.length >= 5) _xanh.push(temp); temp = [mang[i + 1]]; } if (i === len - 2) { if (temp.length >= 5) _xanh.push(temp); } } var _locXanh = []; for (var i = 0; i < _xanh.length; i++) { _locXanh.push.apply(_locXanh, _toConsumableArray(locXanh(_xanh[i]))); } _xanh.splice(0); for (var i = 0; i < _locXanh.length; i++) { _xanh.push.apply(_xanh, _toConsumableArray(timXanhs(_locXanh[i]))); } return _xanh; }; var layTu = exports.layTu = function layTu(mang) { if (mang.length < 5) return []; var tuq = timBo(mang, 4); var ret = []; if (tuq.length > 0) { var k = _lodash2.default.difference(mang, tuq[0]); for (var i = 0; i < k.length; i++) { ret.push([].concat(_toConsumableArray(tuq[0]), [k[i]])); j++; } } return ret; }; var layCuLu = exports.layCuLu = function layCuLu(mang) { if (mang.length < 5) return []; var bo3 = timBo(mang, 3); var ret = []; if (bo3.length > 0) { var k = _lodash2.default.difference(mang, bo3[0]); var doi = timBo(mang, 2); for (var i = doi.length - 1; i >= 0; i--) { ret.push([].concat(_toConsumableArray(bo3[0]), _toConsumableArray(doi[i]))); } } return ret; }; var lay2Doi = exports.lay2Doi = function lay2Doi(mang) { if (layThungs(mang).length > 0) return []; var doi = timBo(mang, 2); var ret = [], len = mang.length, l2 = doi.length, tem; if (l2 < 2 || len === 3) return ret; switch (len) { case 13: { switch (l2) { case 3: { var k = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]), _toConsumableArray(doi[2]))); if ((0, _utils.tinhDiem)(k[0][0]) + (0, _utils.tinhDiem)(k[1][0]) >= 24) return [].concat(_toConsumableArray(doi[1]), _toConsumableArray(doi[2]), [k[6], k[5]]); } case 4: { var k = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]), _toConsumableArray(doi[2]), _toConsumableArray(doi[3]))); if ((0, _utils.tinhDiem)(k[0][0]) + (0, _utils.tinhDiem)(k[1][0]) >= 24) return [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[3]), [k[4]]);else return []; } case 5: { var k = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]), _toConsumableArray(doi[2]), _toConsumableArray(doi[3]), _toConsumableArray(doi[4]))); return [].concat(_toConsumableArray(doi[1]), _toConsumableArray(doi[3]), [k[2]]); } default: return []; } break; } case 8: { switch (l2) { case 2: { var k = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]))); if ((0, _utils.tinhDiem)(k[0][0]) + (0, _utils.tinhDiem)(k[1][0]) >= 24) return [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]), [k[3]]);else return []; } case 3: { var k = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]), _toConsumableArray(doi[2]))); return [].concat(_toConsumableArray(doi[1]), _toConsumableArray(doi[2]), [k[1]]); } case 4: { return [].concat(_toConsumableArray(doi[1]), _toConsumableArray(doi[2]), [doi[3][0]]); } default: return []; } break; } default: return []; } return ret; }; var laySam = exports.laySam = function laySam(mang) { var sam = timBo(mang, 3), l = timBo(mang, 2); var ret = [], tem = [], l2 = sam.length; if (l2 > 0 && l.length === 0) { for (var i = 0; i < l2; i++) { tem.push.apply(tem, _toConsumableArray(sam[i])); }var k = _lodash2.default.difference(mang, tem), l2 = k.length; ret.push.apply(ret, _toConsumableArray(sam[0]).concat([k[l2 - 1], k[l2 - 2]])); } return ret; }; var layDoi = exports.layDoi = function layDoi(mang) { var doi = timBo(mang, 2), len = mang.length, len2 = doi.length; var tem; if (len2 >= 3 && len > 8) return []; switch (len) { case 13: { if (len2 === 3) { tem = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]), _toConsumableArray(doi[2]))); if ((0, _utils.tinhDiem)(tem[0][0]) + (0, _utils.tinhDiem)(tem[1][0]) < 24) return [].concat(_toConsumableArray(doi[0]), [tem[6], tem[5], tem[4]]); } else return []; break; } case 8: { switch (len2) { case 1: tem = _lodash2.default.difference(mang, doi[0]); return [].concat(_toConsumableArray(doi[0]), [tem[5], tem[4], tem[3]]); case 2: tem = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]))); if ((0, _utils.tinhDiem)(tem[0][0]) + (0, _utils.tinhDiem)(tem[1][0]) < 24) return [].concat(_toConsumableArray(doi[0]), [tem[3], tem[2], tem[1]]);else return []; default: return []; } break; } default: return []; } }; var layMauThau = exports.layMauThau = function layMauThau(mang) { var mt = mang.length; if (layDoi(mang).length > 0 || layXanhs(mang).length > 0 || layThungs(mang).length > 0) return []; if (mt === 8) return [mang[0], mang[7], mang[6], mang[5], mang[4]];else if (mt === 3) { return mang; } return []; }; var moonHelper = function moonHelper(mang) { var pip = []; var tuquy = layTu(mang), culu = layCuLu(mang), thung = layThungs(mang), xanh = layXanhs(mang), sam = laySam(mang), _2doi = lay2Doi(mang), doi = layDoi(mang), mt = layMauThau(mang); tuquy.length > 0 ? pip.push.apply(pip, _toConsumableArray(tuquy)) : null; culu.length > 0 ? pip.push.apply(pip, _toConsumableArray(culu)) : null; thung.length > 0 ? pip.push.apply(pip, _toConsumableArray(thung)) : null; xanh.length > 0 ? pip.push.apply(pip, _toConsumableArray(xanh)) : null; sam.length > 0 ? pip.push(sam) : null; _2doi.length > 0 ? pip.push([].concat(_toConsumableArray(_2doi))) : null; doi.length > 0 ? pip.push([].concat(_toConsumableArray(doi))) : null; mt.length > 0 ? pip.push(mt) : null; return pip; }; var moonValue = []; var moonOfShadow = exports.moonOfShadow = function moonOfShadow(mang) { var tong = []; var loop = function loop(arr, tie, chi) { var proc = moonHelper(arr), len = proc.length, moon; for (var i = 0; i < len; i++) { if (chi === 2) { console.log([].concat(_toConsumableArray(tie), [arr]) + '\r\n------------'); tong.push([].concat(_toConsumableArray(tie), [arr])); } else { tie[chi] = proc[i]; moon = _lodash2.default.difference(arr, proc[i]); loop(moon, tie, chi + 1); } } }; loop(_lodash2.default.clone(mang), [], 0); return tong; }; 