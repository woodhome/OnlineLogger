/**
 * Created by WoodHome on 2015/7/15.
 */
var express = require('express')
    ,router = express.Router()
    ,winston = require('winston');

router.use('/logs',function(req,res){
    var limit = req.query.limit
        ,offset = req.query.offset
        ,level = req.query.level
        ,message = req.query.message
        ,from = req.query.from
        ,to = req.query.to;
    if(limit)limit=parseInt(limit);
    else limit=0;
    offset ? offset = parseInt(offset) : offset = 0;
    var query = {};
    if(level && level!='')query.level = level;
    if(message && message !='')query.message = message;
   winston.query({limit:limit,start:offset,until:new Date(parseInt(to)),from:new Date(parseInt(from)),query:query},function(err,result){
       res.json({error:0,logs:result});
    });
});

module.exports = router;