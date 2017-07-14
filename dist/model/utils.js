'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var C = 'c'; // cơ
var B = 'b'; // bích
var T = 't'; // tép 
var R = 'r'; // rô


var J = 'j';
var Q = 'q';
var K = 'k';
var A = 'a';

/**
 * tạo bộ bài tây gồm 52 quân
 * 
 */
var createPokers = exports.createPokers = function createPokers() {
  var pokers = [];
  var chat = [R, C, T, B];
  for (var i = 2; i < 15; i++) {
    for (var j = 0; j < 4; j++) {
      switch (i) {
        case 10:
          pokers.push('0' + chat[j]);break;
        case 11:
          pokers.push('j' + chat[j]);break;
        case 12:
          pokers.push('q' + chat[j]);break;
        case 13:
          pokers.push('k' + chat[j]);break;
        case 14:
          pokers.push('a' + chat[j]);break;
        default:
          pokers.push('' + i + chat[j]);break;
      }
    }
  }
  return pokers;
};

/**
 * Lấy bài kẽ đich đang cầm.
 * bằng cách đưa vào bộ bài
 * và dữ liệu của 3 bots
 * 
 * @param {array} pokers
 * @param {array} owns 
 */
var getEnemy = exports.getEnemy = function getEnemy(pokers, owns) {
  var enemy = [];
  for (var i = 0; i < 52; i++) {
    if (owns.indexOf(pokers[i]) === -1) enemy.push(pokers[i]);else continue;
  }
  return enemy;
};

// /**
//  * chuyển 0jqka thành số 10,11,12,13,14
//  * @param {array} pokers 
//  */
// export const converts = (pokers) => {
//   let len = pokers.length
//   for (var i = 0; i < len; i++) {
//     switch (pokers[i].toString()[0]) {
//       case '0': pokers[i] = pokers[i].replace('0', 10); break
//       case J: pokers[i] = pokers[i].replace(J, 11); break
//       case Q: pokers[i] = pokers[i].replace(Q, 12); break
//       case K: pokers[i] = pokers[i].replace(K, 13); break
//       case A: pokers[i] = pokers[i].replace(A, 14); break
//       default: break
//     }
//   }
//   return pokers
// }
// /**
//  * chuyển 10,11,12,13,14 thành chư 0jqka
//  * @param {array} pokers 
//  */
// export const reverseConverts = (pokers) => {
//   let len = pokers.length
//   for (var i = 0; i < len; i++) {
//     if (pokers[i].length === 3) {
//       switch (pokers[i].toString()[0]) {
//         case '0': pokers[i] = pokers[i].replace('10', 0); break
//         case J: pokers[i] = pokers[i].replace(11, J); break
//         case Q: pokers[i] = pokers[i].replace(12, Q); break
//         case K: pokers[i] = pokers[i].replace(13, K); break
//         case A: pokers[i] = pokers[i].replace(14, A); break
//         default: break
//       }
//     }
//   }
//   return pokers
// }
/**
 * gộm 3 tay tạo ra dữ liêu của bản thân
 * trả về mảng gồm có 39 items
 * @param {array} data 
 */
var getOwns = exports.getOwns = function getOwns(data) {
  var owns = [];
  for (var i = 0; i < 3; i++) {
    owns = [].concat(_toConsumableArray(owns), _toConsumableArray(data[i].split("_")));
  }
  return owns;
};

/**
 * nhập vào và xuất ra điểm
 * @param {string} c 
 * @return {number}
 */
var tinhDiem = exports.tinhDiem = function tinhDiem(c) {
  switch (c) {
    case '0':
      return 10;
    case 'j':
      return 11;
    case 'q':
      return 12;
    case 'k':
      return 13;
    case 'a':
      return 14;
    default:
      return Number(c);
  }
};

/**
   * Đổi cơ số so sánh
   * @param {string} cs 
   */
var doiCS = exports.doiCS = function doiCS(cs) {
  switch (cs) {
    case '0':
      return '?';
    case 'k':
      return 'r';
    case 'a':
      return 'z';
    default:
      return cs;
  }
};
/**
 * mang vào là 1 array of poker :[poker]
 * 
 * sắp xếp mảng theo sự giảm dần của value
 * đẩy ra mảng giảm dần lấy theo thứ tự của value
 * !done
 * @param {array} mang 
 */
var sortByValue = exports.sortByValue = function sortByValue(mang) {
  var len = mang.length;
  for (var i = 0; i < len; i++) {
    for (var j = len - 1; j > i; j--) {
      if (doiCS(mang[j - 1][0]) < doiCS(mang[j][0])) {
        var temp = mang[j];
        mang[j] = mang[j - 1];
        mang[j - 1] = temp;
      }
    }
  }
  return mang;
};

// console.log('Sắp xếp the thứ tự giảm của value:\n', sortByValue(['ac', '5r', '6t', '7c', '0r', '0t', '6t', '7c', '0b', '5c', '5t', '5b']))

/**
 * Truyền vào 1 mảng poker:[poker]
 * sau đó trả ra 1 array như sau
 * @param {array} mang 
 * 
 */
var sortBySymbol = exports.sortBySymbol = function sortBySymbol(mang) {
  if ((typeof mang === 'undefined' ? 'undefined' : _typeof(mang)) !== 'object') return -1;
  var r = [],
      t = [],
      c = [],
      b = [];
  var len = mang.length || 13;
  for (var i = 0; i < len; i++) {
    var ii = mang[i][1];
    switch (ii) {
      case C:
        c.push(mang[i]);continue;
      case R:
        r.push(mang[i]);continue;
      case T:
        t.push(mang[i]);continue;
      case B:
        b.push(mang[i]);continue;
      default:
        new Error('Xem lại mảng có vấn đề');
    }
  }
  var thungs = [];

  if (c.length !== 0) thungs = [].concat(_toConsumableArray(thungs), [sortByValue(c)]);
  if (r.length !== 0) thungs = [].concat(_toConsumableArray(thungs), [sortByValue(r)]);
  if (b.length !== 0) thungs = [].concat(_toConsumableArray(thungs), [sortByValue(b)]);
  if (t.length !== 0) thungs = [].concat(_toConsumableArray(thungs), [sortByValue(t)]);
  return thungs;
  // return [sortByValue(c), sortByValue(r), sortByValue(t), sortByValue(b)]
};

// console.log('Sắp xếp theo chất:\n', sortBySymbol(['ac', '6t', '7c', '0t', '6t', '7c', '0b', '5c', '5t', '5b']))


// /**
//  * Xóa trong mảng đã sort by value
//  * _parent là mảng cha cần xóa
//  * mang là mảng phần tử bị xóa
//  * @param {array} _parent 
//  * @param {array} mang
//  */
// export const removeOnSortByValue = (_parent, mang) => {
//   let ln = mang.length
//   let len = _parent.length
//   let res = _parent.splice(0)
//   for (var i = 0; i < ln; i++) {
//     for (var j = 0; j < len; j++) {
//       if (mang[i].value > res[j].value) break
//       if (res[j].equal(mang[i]))
//         res.splice(j, 1)
//     }
//   }
//   return res
// }

// /**
//  * 
//  * mãng dữ liệu nhập vào sẽ đươc
//  * gom lại thành 1 Object
//  * Object result là tổ hợp của các value mà key là các trị số của value
//  * @param {array} mang 
//  */
// export const combineByValue = mang => {
//   let len = mang.length
//   let result = {}
//   for (var i = 0; i < len; i++) {
//     // if (result.hasOwnProperty(mang[i].value))
//     result[mang[i].value] = [...result[mang[i].value] || [], mang[i]]
//   }
//   return result
// }