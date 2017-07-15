'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.soChi = undefined;

var _cons = require('./cons');

var distance = _interopRequireWildcard(_cons);

var _laws = require('./laws');

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// tính tóan trị số qua các chi.

/**
 * Nhập vào là 1 mảng chứa các phần tử của mảng kết quả.
 * arr là mảng chứa các mảng là kết quả
 * bo là mảng gồm 3 chi
 * Thuật toán so chi là so lần lượt với các trọng số đã cho trước sao cho lấy đc nhiều nhất
 * là 3 mảng có trọng số lớn nhất.
 * nếu mảng bo đưa vào lớn hơn một mỏng bất kì trong arr thì tiến hành thay thế mảng đó
 * mảng có trọng số lớn nhất là kết quả lớn nhất đươc in ra
 * arr được mô tả như sau [{item:[],soDiem:[]}]
 * @param {array} arr 
 * @param {array} bo
 * @return {array} 
 */
var soChi = exports.soChi = function soChi(arr, bo) {
  var tinhDiem = function tinhDiem(arr) {
    return Number(arr[0]) + Number(arr[1]) + Number(arr[2]);
  };
  var _bo = taoBo(bo),
      diem = tinhDiem(_bo.soDiem);
  if (arr.length < 3) arr.push(_bo);else {
    for (var i = 2; i >= 0; i--) {
      var diem2 = tinhDiem(arr[i]);
      if (diem2 < diem) {
        arr.pop();
        arr.push(_bo);
      } else if (diem2 === diem) {
        var win = 0;
        for (var j = 0; j < 3; j++) {
          if (arr[i].soDiem[j] < _bo.soDiem[j]) win++;
        }
        if (win >= 2) {
          arr.pop();
          arr.push(_bo);
        }
      }
    }
  }
  return sortArr(arr);
};

/**
 * Tạo phần tử cho mảng với mảng item tính các giá trị như trọng số và 
 * thêm max value
 * @param {array} bo 
 * @return {object}
 */
var taoBo = function taoBo(bo) {
  var checkChi = function checkChi(chi) {
    var bo2 = (0, _laws.timBo)(chi, 2),
        bo3 = (0, _laws.timBo)(chi, 3);

    if ((0, _laws.timBo)(chi, 4).length === 1) return distance.TUQUY;else if (bo3.length === 1 && bo2.length === 1) return distance.CU;else if (bo3.length === 1 && bo2.length === 0) return distance.XAM;else if ((0, _laws.layThungs)(chi).length === 1) return distance.THUNG;else if ((0, _laws.layXanhs)(chi).length === 1) return distance.XANH;else if ((0, _laws.lay2Doi)(chi).length === 1) return distance.DOIDOI;else if ((0, _laws.layDoi)(chi).length === 1) return distance.DOI;else return distance.MAUTHAU;
  };
  var soDiem = [];
  // , max = []
  for (var i = 0; i < 3; i++) {
    var vt = checkChi(bo[i]);
    // max.push(sortByValue(bo[i])[0])
    soDiem.push(vt + i * 2);
  }
  return { item: bo, soDiem: soDiem };
};

/**
 * sort array sao cho các phần tử bé dần theo trọng số
 * arr được mô tả như sau [{item:[],soDiem:[]}]
 * done!!!
 * @param {array} arr 
 */
var sortArr = function sortArr(arr) {
  var len = arr.length;
  if (len === 1 || len === 0) return arr;
  for (var i = 0; i < len - 1; i++) {
    if (arr[i].value < arr[i + 1].value) {
      var temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
    }
  }
  return arr;
};