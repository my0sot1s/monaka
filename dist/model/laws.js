'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moonOfShadow = exports.timBinh = exports.checkXanhRong = exports.check3Thung = exports.timBo = undefined;

var _utils = require('./utils');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Luật chơi:
 * Mậu binh() Phạm thị tằm 9/7/2017
 * Luật chơi:
 * Tìm: 6 đôi;
 * Tìm: 3 cái thùng;
 * Tìm mậu binh
 * Tìm Tứ quý;
 * Tìm bộ 3;
 * Tìm thùng;
 * Tìm: sảnh.
 * Tìm số đôi.
 * Sắp mậu thầu.
 * 
 * 
 * Thế cờ mạnh/yếu.
 * Thế sám chi cuối.
 * Thế cù lũ chi 2
 * Thế cù thùng + nắp/ A K
 * Thế cù + xảnh.
 * Thế Thùng+ thùng 
 * Thế thùng xảnh
 * 
 * 
 * Yếu
 * Thế xảnh xảnh + mậu thầu yếu
 * Thế xám cô+ xảnh+ mt yếu
 * Thế 5 đôi 
 * Thế 4/3 đôi.
 * 
 * 
 * 
 * Suy nghĩ:
 * + Vét cạn các trường hợp đặc biệt. Sử dụng (quay lui)
 * + Tính bài đối thủ.
 * + sắp bài đối thủ
 * 
 * 
 * Phương pháp:
 * b1) Sắp bài cho quân bạn;
 *  + Thự tự chiến thuật như Luậ chơi.
 * b2) Sắp bài bằng quay lui || vét cạn || combine
 *  + Mục đích tìm các trường hợp đặc biệt 
 *  + Ko có đặc biệt thì kiếm nhưng ko theo thứ tự.
 *  + Tìm phá chi sao cho so chi tối ưu nhất.
 * b3) Tính toán x tiền
 */

/**
 * Chi trước lớn hơn chi sau
 */
var _bai = ['a', 'k', 'q', 'j', '0', '9', '8', '7', '6', '5', '4', '3', '2'];

// chi là mảng phần tử như sau:['4c','5r','6t','7c','3c'] || ['ab','c','2r']

/**
 * Check tứ quý hoặc bộ 3 hoặc đôi
 * !done
 * @param {array} chi 
 * @param {number} bo 
 */
var timBo = exports.timBo = function timBo(chi, bo) {
  var str = chi.toString();
  var _mang = [];
  for (var i = 0; i < str.length; i += 3) {
    var _bo = str.match(new RegExp(str[i] + '[r,c,b,t]', 'g')) || [];
    if (_bo.length === bo) {
      _mang.push(_bo);
      str = str.replace(new RegExp(str[i] + '[r,c,b,t],', 'g'), '');
    }
  }
  return _mang;
};
// console.log('Tìm tứ quý:', timBo(sortByValue(['ac', '5r', '6t', '7c', '0r', '0t', '6t', '7c', '0b', 'qc', '5t', '5b']), 4))

// console.log('Tìm bộ 3:', timBo(sortByValue(['ac', '5r', '6t', '7c', '0r', '0t', '6t', '7c', '0b', 'qc', '5t', '5b']), 3))

// console.log('Tìm các đôi:', timBo(sortByValue(['ac', '5r', '6t', '7c', '0r', '0t', '6t', '7c', '0b', 'qc', '5t', '5b']), 2))


var _thung = [];
/**
 * Check 3 Thùng
 * có: 1 thùng 2 thùng 3 thùng
 * @param {array} chi 
 */
var check3Thung = exports.check3Thung = function check3Thung(chi) {
  var sorted = (0, _utils.sortBySymbol)(chi);
  if (sorted.length === 2 && (sorted[0].length / sorted[1].length === 5 / 8 || sorted[0].length / sorted[1].length === 8 / 5)) {
    sorted[0] = (0, _utils.sortByValue)(sorted[0]);
    sorted[1] = (0, _utils.sortByValue)(sorted[1]);
    for (var i = 0; i < 2; i++) {
      var temp = [];
      if (sorted[0].length === 8) {
        if ((0, _utils.tinhDiem)(sorted[0][0][0]) > (0, _utils.tinhDiem)(sorted[1][0][0])) {
          temp = _lodash2.default.chunk(sorted[0], 5);
          return [temp[0], sorted[1], temp[1]];
        } else {
          temp = _lodash2.default.chunk(sorted[0], 5);
          return [sorted[1], temp[0], temp[1]];
        }
      } else {
        if ((0, _utils.tinhDiem)(sorted[0][0][0]) > (0, _utils.tinhDiem)(sorted[1][0][0])) {
          temp = _lodash2.default.chunk(sorted[1], 5);
          return [sorted[0], temp[0], temp[1]];
        } else {
          temp = _lodash2.default.chunk(sorted[1], 5);
          return [temp[0], sorted[0], temp[1]];
        }
      }
    }
  }
  if (sorted.length === 3) {
    var check = (sorted[0].length / sorted[1].length / sorted[2].length).toFixed(3);
    // debugger
    if (check === '0.333' || check === '0.120') {
      sorted[0] = (0, _utils.sortByValue)(sorted[0]);
      sorted[1] = (0, _utils.sortByValue)(sorted[1]);
      sorted[2] = (0, _utils.sortByValue)(sorted[2]);
      var temp = [null, null, null];
      for (var i = 0; i < 3; i++) {
        if (sorted[i].length === 5 && temp[0] === null) temp[0] = sorted[i];else if (sorted[i].length === 5 && temp[0] !== null) temp[1] = sorted[i];else temp[2] = sorted[i];
      }
      if ((0, _utils.tinhDiem)(temp[0][0][0]) < (0, _utils.tinhDiem)(temp[1][0][0])) {
        var temp2 = temp[0];
        temp[1] = temp[0];
        temp[0] = temp2;
      }
      return temp;
    }
  }
  return false;
};

/**
 * Check xảnh
 * @param {array} chi 
 * @return {boolean}
 */
var checkXanhRong = exports.checkXanhRong = function checkXanhRong(chi) {
  var _chi = (0, _utils.sortByValue)(chi);
  var str = _chi.toString();
  for (var i = 0, j = 0; i < str.length, j < 13; i += 3, j++) {
    if (str[i] !== _bai[j]) return false;
  }
  return _lodash2.default.chunk(_chi, 5);
};

/**
 * Check binh ăn trăng
 * done!!!
 * @param {array} chi 
 * @return {boolean}
 */
var timBinh = exports.timBinh = function timBinh(chi) {
  // tim sanh rong
  var binh = checkXanhRong(chi);
  if (binh) return binh;
  // tìm 3 cái thùng
  binh = check3Thung(chi);
  if (binh) return binh;
  // tìm mậu binh 6 đôi.
  var check = timBo(chi, 2);
  if (check.length === 6) {
    return check;
  }
  return null;
};

/**
 * done!!!
 * @param {array} mang 
 */
var timThung = function timThung(mang) {
  var th = [0],
      all = [],
      len = mang.length;
  function xuat(mang, th, k) {
    var _mang = [];
    for (var i = 1; i <= k; i++) {
      _mang[i - 1] = mang[th[i] - 1];
    }
    all.push(_mang);
  }
  function tohop(mang, vt, n, k) {
    for (var j = th[vt - 1] + 1; j <= n - k + vt; j++) {
      th[vt] = j;
      vt === k ? xuat(mang, th, k) : tohop(mang, vt + 1, n, k);
    }
  }
  // tim tất cả các tổ hợp chập 5 của len phần tử
  // với len là độ lớn của mảng mang len>=6
  tohop(mang, 1, len, 5);
  return all;
};
// console.log(timThung(['2r', '3r', '4r', '5r', '6r', '7r']))
var layThungs = function layThungs(mang) {
  var _mang = (0, _utils.sortBySymbol)(mang);
  var thungs = [];
  for (var i = 0; i < _mang.length; i++) {
    if (_mang[i].length < 5) continue;else if (_mang[i].length === 5) thungs.push(_mang[i]);else thungs.push.apply(thungs, _toConsumableArray(timThung(_mang[i])));
  }
  return thungs;
};
var timXanhs = function timXanhs(mang) {
  var xanh = [],
      x = [];
  var taoXanh = function taoXanh(xx) {
    if (xx.length === 5) xanh.push(xx);
  };
  /**
  * bắn vào 1 mảng đã sắp xếp liên tục có độ dài giảm dần
  * fuck sử dụng quay lui
  * dk: length >= 6
  * bắn ra các mảng
  * @param {array} mang 
  * @param {number} vt 
  */
  var timXanh = function timXanh(mang, vt) {
    // debugger
    if (Array.isArray(mang[vt])) {
      for (var i = 0; i < mang[vt].length; i++) {
        x[vt] = mang[vt][i];
        if (vt === 4) xanh.push(_lodash2.default.clone(x));else timXanh(mang, vt + 1);
      }
    } else {
      x[vt] = mang[vt];
      if (vt === 4) xanh.push(_lodash2.default.clone(x));else timXanh(mang, vt + 1);
    }
  };
  timXanh(mang, 0);
  return xanh;
};

// console.log(timXanhs([['6b', '6c'], ['5c', '5r'], '4b', '3r', '2r']))

/**
 * lấy tất cả các xảnh có thể có 
 * từ mảng đã sắp theo value
 * @param {array} mang 
 */
var layXanhs = function layXanhs(mang) {
  /**
   * lọc xảnh ra mảng 5 pt
   * @param {array} mang 
   */
  var locXanh = function locXanh(mang) {
    var _mang = [],
        len = mang.length;
    if (len < 10) {
      var vt = 0;
      while (vt + 5 <= len) {
        _mang.push(_lodash2.default.clone(mang).splice(vt, 5));
        vt++;
      }
    } else {
      _mang.push.apply(_mang, [mang.splice(0, 5)].concat(_toConsumableArray(timXanh(mang))));
    }
    return _mang;
  };
  var _xanh = [],
      temp = [],
      len = mang.length;
  for (var i = 0; i < len - 1; i++) {
    //nếu ko phải là số thì
    // debugger
    if (i === 0) temp.push(mang[i]);
    if ((0, _utils.tinhDiem)(mang[i][0]) === (0, _utils.tinhDiem)(mang[i + 1][0]) + 1) temp.push(mang[i + 1]);else if ((0, _utils.tinhDiem)(mang[i][0]) === (0, _utils.tinhDiem)(mang[i + 1][0])) {
      var p = temp.pop();
      if (Array.isArray(p)) temp.push([].concat(_toConsumableArray(p), [mang[i + 1]]));else temp.push([p, mang[i + 1]]);
    } else {
      // debugger
      if (temp.length >= 5) _xanh.push(temp);
      temp = [mang[i + 1]];
    }
    if (i === len - 2) {
      if (temp.length >= 5) _xanh.push(temp);
    }
  }
  var _locXanh = [];
  // debugger
  for (var i = 0; i < _xanh.length; i++) {
    _locXanh.push.apply(_locXanh, _toConsumableArray(locXanh(_xanh[i])));
  }
  _xanh.splice(0);
  for (var i = 0; i < _locXanh.length; i++) {
    _xanh.push.apply(_xanh, _toConsumableArray(timXanhs(_locXanh[i])));
  }
  return _xanh;
};

// console.log(layXanhs(['at', 'kr', 'qb', 'jr', '0c', '9c', '6b', '6t', '5c', '5b', '4t', '3r', '2c']))

// console.log(layXanhs(['ac', 'kc', 'qc', 'jc', 'jt', '0b', '0c', '5c', '4c', '3c', '2r']))

// console.log(timXanhs(['9r', '8b', '7c', '6t', ['5b', '5c', '5r'], '4r'], 0))

// console.log(timXanh(['5t', '6b', '8r', '9r', '0r', '7', '9r', '0r', '7', '22', '22']))


/**
 * Lấy tất cả các bộ tứ
 * và các trường hợp có thể có của bộ tứ
 * @param {array} mang 
 */
var layTu = function layTu(mang) {
  if (mang.length < 5) return [];
  var tuq = timBo(mang, 4);
  var ret = [];
  if (tuq.length > 0) {
    var k = _lodash2.default.difference(mang, tuq[0]);
    for (var i = 0; i < k.length; i++) {
      ret.push([].concat(_toConsumableArray(tuq[0]), [k[i]]));
      j++;
    }
  }
  return ret;
};
// console.log(layTu(['6t', '6b', '6r', '6r', '0r', '7', '9r', '0r', '7', '22', '22']))
/**
 * Lấy các trương hợp là cù
 * @param {array} mang 
 */
var layCuLu = function layCuLu(mang) {
  if (mang.length < 5) return [];
  var bo3 = timBo(mang, 3);
  var ret = [];
  if (bo3.length > 0) {
    var k = _lodash2.default.difference(mang, bo3[0]);
    var doi = timBo(mang, 2);
    for (var i = 0; i < doi.length; i++) {
      // debugger
      ret.push([].concat(_toConsumableArray(bo3[0]), _toConsumableArray(doi[i])));
    }
  }
  return ret;
};
// console.log(layCuLu(['kt', 'kb', 'kr', '8r', '8r', '7t', '4r', '4c', '2t', '2c']))
/**
 * lấy ra 2 đôi cho chi với 2 đôi
 * @param {array} mang 
 */
var lay2Doi = function lay2Doi(mang) {
  if (mang.length < 5) return [];
  var _2doi = timBo(mang, 2);
  var ret = [];
  if (_2doi.length >= 2) {
    var k = _lodash2.default.difference(mang, [].concat(_toConsumableArray(_2doi[0]), _toConsumableArray(_2doi[1])));
    for (var i = 0; i < k.length; i++) {
      ret.push([].concat(_toConsumableArray(_2doi[0]), _toConsumableArray(_2doi[1]), [k[i]]));
    }
  }
  return ret;
};
// console.log(lay2Doi(['at', 'kb', 'kr', '8r', '8r', '7c', '4r', '4r', '2t', '2t']))

/**
 * lấy sám cô
 * @param {array} mang 
 */
var laySam = function laySam(mang) {
  var sam = timBo(mang, 3),
      l = timBo(mang, 2);
  var ret = [],
      tem = [];
  // debugger
  if (sam.length > 0 && l.length === 0) {
    for (var i = 0; i < sam.length; i++) {
      tem.push.apply(tem, _toConsumableArray(sam[i]));
    }var k = _lodash2.default.difference.apply(_lodash2.default, [mang].concat(tem)),
        l2 = k.length;
    ret.push.apply(ret, _toConsumableArray(sam[0]).concat([k[l2 - 1], k[l2 - 2]]));
  }
  return ret;
};
// console.log(laySam(['at', 'kb', 'jr', '8r', '8t', '8c', '5r', '4r', '3t', '2t']))

/**
 * lấy các trường hợp với đôi
 * @param {array} mang 
 */
var layDoi = function layDoi(mang) {
  var doi = timBo(mang, 2),
      len = mang.length,
      len2 = doi.length;
  var tem;
  // debugger
  switch (len) {
    case 13:
      {
        switch (len2) {
          case 2:
            tem = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1])));
            return [].concat(_toConsumableArray(doi[0]), [tem[8], tem[7], tem[6]]);
          case 3:
            tem = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]), _toConsumableArray(doi[2])));
            return [].concat(_toConsumableArray(doi[0]), [tem[6], tem[5], tem[4]]);
          case 4:
            tem = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]), _toConsumableArray(doi[2]), _toConsumableArray(doi[3])));
            return [].concat(_toConsumableArray(doi[2]), _toConsumableArray(doi[3]), [tem[4]]);
          case 5:
            tem = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]), _toConsumableArray(doi[2]), _toConsumableArray(doi[3]), _toConsumableArray(doi[4])));
            return [].concat(_toConsumableArray(doi[1]), _toConsumableArray(doi[4]), [tem[2]]);
          default:
            return [];
        }
      }
    case 8:
      {
        switch (len2) {
          case 1:
            tem = _lodash2.default.difference(mang, doi[0]);
            return [].concat(_toConsumableArray(doi[0]), [tem[5], tem[4], tem[3]]);
          case 2:
            tem = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1])));
            if ((0, _utils.tinhDiem)(tem[0][0]) + (0, _utils.tinhDiem)(tem[1][0]) >= 24) return [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]), [tem[2]]);else return [].concat(_toConsumableArray(doi[0]), [tem[1], tem[2], tem[3]]);
          case 3:
            tem = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]), _toConsumableArray(doi[2])));
            return [].concat(_toConsumableArray(doi[1]), _toConsumableArray(doi[2]), [tem[2]]);
          case 4:
            tem = _lodash2.default.difference(mang, [].concat(_toConsumableArray(doi[0]), _toConsumableArray(doi[1]), _toConsumableArray(doi[2]), _toConsumableArray(doi[3])));
            return [].concat(_toConsumableArray(doi[1]), _toConsumableArray(doi[2]), [tem[3][0]]);
          default:
            return [];
        }
      }
    default:
      return [];
  }
};
// console.log(layDoi(['at', 'kb', 'kr', 'jr', 'jb', '0c', '8r', '8r', '7c', '4r', '4c', '2t', '2t']))

/**
 * mảng nhập vào
 * @param {array} mang 
 * @return {array} 
 */
var moonHelper = function moonHelper(mang) {
  var pip = [];
  var tuquy = layTu(mang),
      culu = layCuLu(mang),
      thung = layThungs(mang),
      xanh = layXanhs(mang),
      sam = laySam(mang),
      _2doi = lay2Doi(mang),
      doi = layDoi(mang);
  tuquy.length > 0 ? pip.push.apply(pip, _toConsumableArray(tuquy)) : null;
  // console.log(tuquy.length)
  culu.length > 0 ? pip.push.apply(pip, _toConsumableArray(culu)) : null;
  // console.log(culu.length)

  thung.length > 0 ? pip.push.apply(pip, _toConsumableArray(thung)) : null;
  // console.log(thung.length)

  xanh.length > 0 ? pip.push.apply(pip, _toConsumableArray(xanh)) : null;
  // console.log(xanh.length)

  sam.length > 0 ? pip.push(sam) : null;
  // console.log(xanh.length)

  _2doi.length > 0 ? pip.push.apply(pip, _toConsumableArray(_2doi)) : null;
  // console.log(_2doi.length)

  doi.length > 0 ? pip.push([].concat(_toConsumableArray(doi))) : null;
  // console.log(doi.length)
  return pip;
};

// console.log(moonHelper(['at', 'kr', 'qb', 'jr', '0c', '9c', '6b', '6t', '5c', '5b', '4t', '3r', '2c']))


var moonValue = [];

/**
 * Tính toán lấy ra các trường hợp
 * @param {array} mang 
 */
var moonOfShadow = exports.moonOfShadow = function moonOfShadow(mang) {
  // tinh các trường hợp có thể sử dụng được
  var tong = [],
      tie = [];
  /**
   * nap dữ liệu vào các chi
   * @param {array} mang 
   * @param {number} chi 
   */
  var loop = function loop(mang, chi) {
    tie[chi] = mang;
    // debugger
    if (tie.length === 3 && chi === 2) tong.push(_lodash2.default.clone(tie));
    var proc = moonHelper(mang),
        len = proc.length;
    for (var i = 0; i < len; i++) {
      tie[chi] = proc[i];
      loop(_lodash2.default.difference(mang, proc[i]), chi + 1);
    }
  };
  loop(mang, 0);
  return tong;
};

// console.log(moonOfShadow(['ar', 'kr', 'qb', 'jr', '0c', '9c', '6b', '6t', '5r', '5b', '4t', '3r', '2c']))