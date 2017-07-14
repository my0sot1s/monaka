// /**
//  * Nhận vào 1 dãy string và sắp xếp string sau đó.
//  * trả về string như ban đầu nhưng có thứ tự xác định.
//  * day gồm đối tượng poker đã fomat thành công.
//  * poker gồm dạng pocker(score:{Number},symbol:{Charactor})
//  * @param {String} day 
//  * @return {String} 
//  */

// // Vét Tìm kiếm tất cả trường hợp cho kẻ địch được lợi lớn nhất và đúng luật
// const digForEnemy = pokers => {

// }

// /**
//  * Tìm Thùng phá sảnh
//  * Nhập vào 1 collections là 1 object săp theo kiểu symbol
//  * Tìm và trả lại kết quả.
//  * @param {object} collections 
//  */
// export const searchStraightFlush = collections => {
//   // lấy thông tin độ dài các mảng trong collection
//   Object.values(collections).map = (data, key) => {
//     if (data.length >= 5) {
//       let mang = []
//       for (let i = 0; i < data.length; i++) {
//         if (mang.length === 0 || data[i - 1].value - data[i].value === 1) mang.push(data[i])
//         else mang = [data[i]]
//       }
//       if (mang.length === 5)
//         RESULT = [...mang]
//     }
//   }
// }

// /**
//  * Xóa các phần tử đã được thêm vào RESULT khỏi các mảng cơ bản
//  * @param {array} _parent 
//  * @param {array} array 
//  */
// export const removeArray = (_parent, array) => {
//   for (let i = 0; i < array.length; i++) {
//     for (let j = 0; j < _parent.length; j++) {
//       if (array[i].equal(_parent[j])) {
//         _parent.splice(j, 1)
//         continue
//       }
//     }
//   }
//   return _parent
// }
"use strict";