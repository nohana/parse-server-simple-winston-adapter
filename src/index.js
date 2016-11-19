// Logger Adapter
//
// Allows you to change the logger mechanism
//
// Adapter classes must implement the following functions:
// * log() {}
// * query(options, callback) /* optional */
// Default is WinstonLoggerAdapter.js
import SimpleWinstonAdapter from './SimpleWinstonAdapter';

export default SimpleWinstonAdapter;
