/**
 * Created by Administrator on 2015/7/16.
 */
var OnlinLogger = require('./lib');

OnlinLogger.start(6606,{db:'mongodb://@127.0.0.1:27017/logger'});

OnlinLogger.logger.log('error','first log',{meta:'this is meta'});