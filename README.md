# parse-server-simple-winston-adapter

# installation

```
npm install --save parse-server-simple-winston-adapter
```

# usage with parse-server

## using congfig file

```
{
  "appId": 'my_app_id',
  "masterKey": 'my_master_key',
  // other options
  "loggerAdapter": {
    "module": "parse-server-simple-winston-adapter",
    "options": {
      "global": {
        "dirname": "./logs",
        "json": true,
        "silent": false,
        "verbose": false
      },
      "transports": [{
        "type": "file",
        "name": "parse-server",
        "filename": "parse-server.json",
        "level": "debug"
      },{
        "type": "file",
        "name": "parse-server.error",
        "filename": "parse-server.error.json",
        "level": "error"
      },{
        "type": "console",
        "name": "console",
        "stringify": true,
        "colorize": true
      }]
    }
  }
}
```
