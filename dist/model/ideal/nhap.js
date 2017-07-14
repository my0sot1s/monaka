"use strict";

// const tinhTong = (num) => {
//   if (num === 1) return 1;
//   else {
//     return 1 / num + tinhTong(num - 1)
//   }
// }

var tinhTong2 = function tinhTong2(num) {
  if (num === 1) return 1 / 2;else return (2 * num + 1) / (2 * num + 2) + tinhTong2(num - 1);
};
var tinhnhan = function tinhnhan(num) {
  if (num === 1) return 1;else return num * tinhnhan(num - 1);
};
var tinhmu = function tinhmu(mu, num) {
  if (mu === 1) return num;else return Math.pow(mu, num) + tinhmu(mu - 1, num);
};
var demSole = function demSole(so) {
  var r = 0;
  while (so > 1) {
    var a = so % 10;
    if (a % 2 !== 0) r++;
    so = Math.floor(so / 10);
  }
  return r;
};
var gt = function gt(num) {
  if (num === 1) return 1;else return num * gt(num - 1);
};

var tongGt = function tongGt(num) {
  if (num === 1) return 1;else return gt(num) + tongGt(num - 1);
};

// const demsl = so => {
//   if (so == 0) return 0
//   else {
//     var a = so % 10;
//     if (a % 2 !== 0)
//       return 1 + demsl(Math.floor(so / 10))
//     else return demsl(Math.floor(so / 10))
//   }
// }

// const bubbleSort = () => {
//   var mang = [3, 1, 6, 2, 9, 4, 11, 8, 8, 3]
//   for (var i = 0; i < mang.length; i++) {
//     for (var j = mang.length - 1; j > i; j--) {
//       if (!mang[j - 1] || !mang[j])
//         if (mang[j - 1] < mang[j]) {
//           mang[j - 1] = mang[j] + mang[j - 1]
//           mang[j] = mang[j - 1] - mang[j]
//           mang[j - 1] = mang[j - 1] - mang[j]
//         }
//     }
//   }
//   return mang
// }

// console.log(bubbleSort())

var init = function init(mang) {
  for (var i = 0; i < mang.length; i++) {
    mang[i] = 0;
  }
  return mang;
};

var tryBack = function tryBack(start, mang, pt) {
  for (var i = 0; i <= 1; i++) {
    mang[start] = i;
    if (start === pt) console.log(mang);else tryBack(start + 1, mang, pt);
  }
};
var sinhXau = function sinhXau() {
  var mang = new Array(5);
  mang = init(mang);
  tryBack(1, mang, 5);
};

// Cho một mảng nn phần tử X[1, 2, …,n]X[1, 2, …,n] và một số TT.
// Có tồn tại một tập con các phần tử của mảng XX sao cho tổng của chúng bằng TT
// Ví dụ: X = { 8,6,7,5,3,10,9}X= { 8,6,7,5,3,10,9} và T= 12T= 12.
// Lời giải là true vì tập con {7, 5 } { 7, 5 } của XX có tổng bằng 12.
var subSet = function subSet(mang, r, T) {
  if (T === 0) return 1;
  if (T < 0 || r === -1) return 0;
  if (subSet(mang, r - 1, T - mang[r]) === 1) return 1;
  if (subSet(mang, r - 1, T) === 1) return 1;
  return 0;
};

// sinhXau()

var timXau = function timXau(mang) {
  var xau = [];
  var subXau = [];
  for (var i = 0; i < mang.length; i++) {
    if (subXau.length === 0) subXau.push(mang[i]);
    if (mang[i] === mang[i + 1] + 1) {
      subXau.push(mang[i + 1]);
    } else {
      console.log(subXau);
      if (subXau.length >= 5) xau.push(subXau);
      subXau = [];
    }
  }
  return xau;
};

console.log(timXau([10, 9, 8, 7, 5, 4, 3, 2, 1]));