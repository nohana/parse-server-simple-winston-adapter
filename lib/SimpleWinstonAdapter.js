'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleWinstonAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Logger Adapter
//
// Allows you to change the logger mechanism
//
// Adapter classes must implement the following functions:
// * log() {}
// * query(options, callback) /* optional */
// Default is WinstonLoggerAdapter.js

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var logger = new _winston2.default.Logger();

var SimpleWinstonAdapter = exports.SimpleWinstonAdapter = function () {
  function SimpleWinstonAdapter(options) {
    var _this = this;

    _classCallCheck(this, SimpleWinstonAdapter);

    var transports = [];
    _lodash2.default.forEach(options.transports, function (transportSetting) {
      transportSetting = _this.buildTransportSetting(transportSetting, options.global);
      var transport = _this.createTransports(transportSetting);
      if (transport != null) {
        transports.push(transport);
      }
    });

    this.updateTransports(transports);
  }

  _createClass(SimpleWinstonAdapter, [{
    key: 'buildTransportSetting',
    value: function buildTransportSetting(transport, global) {
      var setting = Object.assign({}, global, transport);

      // make logs directory if not exist.
      if (setting.type === "file" && setting.dirname) {
        if (!_path2.default.isAbsolute(setting.dirname)) {
          setting.dirname = _path2.default.resolve(process.cwd(), setting.dirname);
        }try {
          _fs2.default.mkdirSync(setting.dirname);
        } catch (exception) {}
      }

      if (setting.verbose) {
        setting.level = 'verbose';
      }

      return setting;
    }
  }, {
    key: 'createTransports',
    value: function createTransports(transportSetting) {
      var type = transportSetting.type;
      delete transportSetting.type;
      switch (type) {
        case "file":
          return new _winston2.default.transports.File(transportSetting);
        case "console":
          return new _winston2.default.transports.Console(transportSetting);
        default:
          return null;
      }
    }
  }, {
    key: 'updateTransports',
    value: function updateTransports(transports) {
      logger.configure({ transports: transports });
    }
  }, {
    key: 'log',
    value: function log() {
      return logger.log.apply(logger, arguments);
    }
  }]);

  return SimpleWinstonAdapter;
}();

exports.default = SimpleWinstonAdapter;