'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileSizeInBytes = exports.clearFile = exports.getLog = exports.appendLog = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * @param {string} fileName 
 * @param {string} content 
 */
var appendLog = exports.appendLog = function appendLog(fileName, content) {
  _fs2.default.appendFile(__dirname + '/' + fileName, content, function (err) {
    if (err) console.log('line:10 ', err);
  });
};

/**
 * 
 * @param {string} fileName 
 * @param {function} cb 
 */
var getLog = exports.getLog = function getLog(fileName, cb) {
  _fs2.default.readFile(fileName, 'utf-8', function (err, data) {
    if (err) cb(err);else cb(data);
  });
};

/**
 * clear file
 * @param {string} fileName 
 */
var clearFile = exports.clearFile = function clearFile(fileName) {
  _fs2.default.writeFile(fileName, '', function (err) {
    if (err) console.log('line:32 ', err);
  });
};

/**
 * lấy file size mb
 * @param {string} fileName 
 */
var getFileSizeInBytes = exports.getFileSizeInBytes = function getFileSizeInBytes(fileName) {
  var stats = _fs2.default.statSync(__dirname + '/' + fileName);
  var fileSizeInBytes = stats["size"];
  return fileSizeInBytes / 1000000.0;
  // return
};