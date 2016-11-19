'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SimpleWinstonAdapter = require('./SimpleWinstonAdapter');

var _SimpleWinstonAdapter2 = _interopRequireDefault(_SimpleWinstonAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SimpleWinstonAdapter2.default; // Logger Adapter
//
// Allows you to change the logger mechanism
//
// Adapter classes must implement the following functions:
// * log() {}
// * query(options, callback) /* optional */
// Default is WinstonLoggerAdapter.js