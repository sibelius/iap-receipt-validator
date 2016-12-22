'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _statusCodes;

var _typeof = Symbol === "function" && Symbol.iterator === "symbol" ? function (obj) {
  return obj;
} : function (obj) {
  return obj && Symbol === "function" && obj.constructor === Symbol ? "symbol" : obj;
};

exports.default = function (password) {
  var _this2 = this;

  var production = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  var endpoint = production ? productionHost : sandboxHost;
  var verifyUrl = 'https://' + endpoint + '/verifyReceipt';

  return function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(receipt) {
      var payload, options, res, body;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              payload = {
                'receipt-data': receipt,
                password: password
              };
              options = {
                body: JSON.stringify(payload),
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              };
              _context.next = 4;
              return fetch(verifyUrl, options);

            case 4:
              res = _context.sent;
              _context.next = 7;
              return res.json();

            case 7:
              body = _context.sent;

              if (!(body.status !== 0)) {
                _context.next = 10;
                break;
              }

              throw new VerificationError(statusCodes[body.status]);

            case 10:
              return _context.abrupt('return', receipt);

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);var value = info.value;
        } catch (error) {
          reject(error);return;
        }if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            return step("next", value);
          }, function (err) {
            return step("throw", err);
          });
        }
      }return step("next");
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var fetch = (window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' ? window.fetch : global.fetch;

if (!fetch) throw new Error('A global `fetch` method is required as either `window.fetch` ' + 'for browsers or `global.fetch` for node runtime environments. ' + 'Please add `require(\'isomorphic-fetch\')` before importing `frisbee`. ' + 'You may optionally `require(\'es6-promise\').polyfill()` before you ' + 'require `isomorphic-fetch` if you want to support older browsers.' + '\n\nFor more info: https://github.com/niftylettuce/frisbee#usage');

var productionHost = 'buy.itunes.apple.com';
var sandboxHost = 'sandbox.itunes.apple.com';

var statusCodes = (_statusCodes = {}, _defineProperty(_statusCodes, 0, { message: 'Active', valid: true, error: false }), _defineProperty(_statusCodes, 21000, { message: 'App store could not read', valid: false, error: true }), _defineProperty(_statusCodes, 21002, { message: 'Data was malformed', valid: false, error: true }), _defineProperty(_statusCodes, 21003, { message: 'Receipt not authenticated', valid: false, error: true }), _defineProperty(_statusCodes, 21004, { message: 'Shared secret does not match', valid: false, error: true }), _defineProperty(_statusCodes, 21005, { message: 'Receipt server unavailable', valid: false, error: true }), _defineProperty(_statusCodes, 21006, { message: 'Receipt valid but sub expired', valid: false, error: false }), _defineProperty(_statusCodes, 21007, { message: 'Sandbox receipt sent to Production environment', valid: false, error: true, redirect: true }), _defineProperty(_statusCodes, 21008, { message: 'Production receipt sent to Sandbox environment', valid: false, error: true }), _statusCodes);

function VerificationError(error) {
  var _this = this;

  ['message', 'valid', 'error', 'redirect'].map(function (prop) {
    return _this[prop] = error[prop];
  });
}
VerificationError.prototype = Object.create(Error.prototype);