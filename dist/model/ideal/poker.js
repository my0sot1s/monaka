'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var J = 'j';
var Q = 'q';
var K = 'k';
var A = 'a';

var Poker = function () {
  
  function Poker(main) {
    _classCallCheck(this, Poker);

    this._value = main[0];
    this._symbol = main[1];
  }
  /**
   * Nhận vào 1 object poker trả về kết quả xuôi.
   * là việc convert 0:-10 j:-11 q:-12 k:-13 a:-14
   * và có thể convert ngược theo thứ tự trên
   * convert vừa xuôi vừa ngược
   * @param {Object} poker 
   */


  _createClass(Poker, [{
    key: 'equal',
    value: function equal(p) {
      return this._value === p.value && this._symbol === p.symbol;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '' + this._value + this._symbol;
    }
  }, {
    key: 'symbol',
    get: function get() {
      return this._symbol;
    }
  }, {
    key: 'value',
    get: function get() {
      return this._value;
    }
  }, {
    key: 'setValue',
    set: function set(value) {
      this._value = value;
    }
  }], [{
    key: 'convert',
    value: function convert(poker) {
      switch (poker.value) {
        case '0':
          poker.setValue = 10;return poker;
        case J:
          poker.setValue = 11;return poker;
        case Q:
          poker.setValue = 12;return poker;
        case K:
          poker.setValue = 13;return poker;
        case A:
          poker.setValue = 14;return poker;
        case 10:
          poker.setValue = '0';return poker;
        case 11:
          poker.setValue = J;return poker;
        case 12:
          poker.setValue = Q;return poker;
        case 13:
          poker.setValue = K;return poker;
        case 14:
          poker.setValue = A;return poker;
        default:
          poker.setValue = Number(poker.value);return poker;
      }
    }
    /**
     * 
     * @param {array} pokers 
     */

  }, {
    key: 'converts',
    value: function converts(pokers) {
      var len = pokers.length;
      for (var i = 0; i < len; i++) {
        pokers[i] = Poker.convert(new Poker(pokers[i]));
      }
      return pokers;
    }
  }]);

  return Poker;
}();

exports.default = Poker;