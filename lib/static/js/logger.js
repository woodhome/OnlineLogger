/**
 * Created by WoodHome on 2015/7/16.
 */
(function(){
    var app = angular.module('loggerApp',['simplePagination']);

    app.controller('loggerController',['$http','Pagination',function($http,Pagination){
        var logger = this;
        logger.countPerPage = 3;
        logger.pagination = Pagination.getNew(5);

        this.update = function(){
            $http.get('/logs?offset='+(this.pagination.page * this.countPerPage)+'&limit='+this.countPerPage).success(function(data){
                logger.logs = data.logs.mongodb;
                logger.pagination.numPages = Math.ceil(data.total/logger.countPerPage);
            });
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