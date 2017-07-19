const fs = require('fs');
const path = require('path');
const list = process.argv;
// //.*   xóa comment
// /?\*[^"']* xóa note
// \n  1 line
var isError = 0, errorAt = []

// xu ly
/**
 * Đọc file lấy thông tinh
 * @param {string} path 
 * @param {function} done 
 * @return {string}
 */
function readFileEdit(path, done) {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) new Error(err)
    else {
      data = data.replace(/\/?\*.*|\/\/.*/g, '')
        .replace(/console\.log.*/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\s\s+/g, ' ');
      done(path, data)
    }
  })
}
/**
 * Viết vào file vơi nọi dung content
 * @param {string} path 
 * @param {string} content 
 */
function writeFileEdit(path, content) {
  fs.writeFile(path, content, function (err) {
    if (err) {
      isError++; errorAt.push(i - 2)
      return console.log(err);
    }
  });
}
for (var i = 2; i < list.length; i++) {
  //neu ko là file thì continues
  if (fs.lstatSync(`${list[i]}`).isDirectory()) continue;
  readFileEdit(`${list[i]}`, writeFileEdit)
}
if (isError === 0)
  console.log('Successful')
else console.log(isError, errorAt)
