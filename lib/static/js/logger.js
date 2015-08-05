/**
 * Created by WoodHome on 2015/7/16.
 */
(function(){
    var app = angular.module('loggerApp',['simplePagination']);

    app.controller('loggerController',['$http','Pagination',function($http,Pagination){
        var logger = this;
        logger.countPerPage = 100;
        logger.pagination = Pagination.getNew(5);
        logger.level = '';
        logger.message='';

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