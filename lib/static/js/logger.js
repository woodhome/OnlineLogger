/**
 * Created by WoodHome on 2015/7/16.
 */
(function(){
    Date.prototype.Format = function(fmt)
    {
        var o = {
            "M+" : this.getMonth()+1,                 //�·�
            "d+" : this.getDate(),                    //��
            "h+" : this.getHours(),                   //Сʱ
            "m+" : this.getMinutes(),                 //��
            "s+" : this.getSeconds(),                 //��
            "q+" : Math.floor((this.getMonth()+3)/3), //����
            "S"  : this.getMilliseconds()             //����
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    }

    var app = angular.module('loggerApp',['simplePagination']);

    app.controller('loggerController',['$http','Pagination',function($http,Pagination){
        var logger = this;
        logger.countPerPage = 100;
        logger.pagination = Pagination.getNew(5);
        logger.level = '';
        logger.message='';

        this.start = new Date().Format('yyyy/MM/dd hh:mm:ss');
        this.end = new Date().Format('yyyy/MM/dd hh:mm:ss');

        this.update = function(){
            if(this.start && this.end){
                var start = new Date(this.start).getTime()
                    ,end = new Date(this.end).getTime();
                $http.get('/logs?offset='+(this.pagination.page * this.countPerPage)+'&limit='+this.countPerPage
                    +'&from='+start+'&to='+end+'&level='+logger.level+"&message="+logger.message).success(function(data){
                    logger.logs = data.logs.mongodb;
                    logger.pagination.numPages = Math.ceil(data.total/logger.countPerPage);
                });
            }else{
                $http.get('/logs?offset='+(this.pagination.page * this.countPerPage)+'&limit='+this.countPerPage).success(function(data){
                    logger.logs = data.logs.mongodb;
                    logger.pagination.numPages = Math.ceil(data.total/logger.countPerPage);
                });
            }
        }

        this.prevPage = function(){
            this.pagination.prevPage();
            this.update();
        }

        this.toPageId = function(n){
            this.pagination.toPageId(n);
            this.update();

        }

        this.nextPage = function(){
            this.pagination.nextPage();
            this.update();
        }

        this.update();
    }]);
})();