/**
 * Created by WoodHome on 2015/7/15.
 */
var express = require('express')
    ,router = express.Router()
    ,winston = require('winston');

router.use('/logs',function(req,res){
    var limit = req.query.limit
        ,offset = req.query.offset
        ,from = req.query.from
        ,to = req.query.to;
    winston.query({limit:limit,start:offset},function(err,result){
       res.json({error:0,logs:result});
    });
});

module.exports = router;