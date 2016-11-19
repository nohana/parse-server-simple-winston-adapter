// Logger Adapter
//
// Allows you to change the logger mechanism
//
// Adapter classes must implement the following functions:
// * log() {}
// * query(options, callback) /* optional */
// Default is WinstonLoggerAdapter.js

import winston from 'winston';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const logger = new winston.Logger();

export class SimpleWinstonAdapter {
  constructor(options) {
    let transports = [];
    _.forEach(options.transports, (transportSetting)=>{
      transportSetting = this.buildTransportSetting(transportSetting, options.global);
      let transport = this.createTransports(transportSetting);
      if (transport != null) {
        transports.push(transport);
      }
    });

    this.updateTransports(transports);
  }

  buildTransportSetting(transport, global) {
    let setting = Object.assign({}, global, transport);

    // make logs directory if not exist.
    if (setting.type === "file" && setting.dirname) {
      if (!path.isAbsolute(setting.dirname)) {
        setting.dirname = path.resolve(process.cwd(), setting.dirname);
      } try {
        fs.mkdirSync(setting.dirname);
      } catch (exception) {}
    }

    if (setting.verbose) {
      setting.level = 'verbose';
    }

    return setting;
  }


  createTransports(transportSetting) {
    let type = transportSetting.type;
    delete transportSetting.type;
    switch (type) {
    case "file":
      return new (winston.transports.File)(transportSetting);
    case "console":
      return new (winston.transports.Console)(transportSetting);
    default:
      return null;
    }
  }

  updateTransports(transports) {
    logger.configure({transports: transports});
  }

  log() {
    return logger.log.apply(logger, arguments);
  }
}

export default SimpleWinstonAdapter;
