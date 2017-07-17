'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:ExamdetaillistCtrl
 * @description
 * # ExamdetaillistCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
    .controller('ExamdetaillistCtrl', function($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading, $stateParams) {
        //退出
        $scope.loginOut = commonService.loginOut;
        //请求用户信息
        $loading.start('loginOut');
        commonService.getData(ALL_PORT.LoginLong.url, 'POST', ALL_PORT.LoginLong.data).then(function(response) {
          $loading.finish('loginOut');
          $scope.userMessage = response.Data;
        });

        //考试记录
        $loading.start('examDetail');
        $scope.Id = $stateParams.Id;
      $scope.paginationConf = $.extend({},paginationConf,{itemsPerPage: ALL_PORT.ExamDetailListItem.data.rows});
      $scope.requestExamDetail = function(options) {
            var params = $.extend({}, ALL_PORT.ExamDetailListItem.data, options, { examid: $scope.Id });
            commonService.getData(ALL_PORT.ExamDetailListItem.url, 'POST', params)
                .then(function(response) {
                    $loading.finish('examDetail');
                    $scope.paginationConf.totalItems = response.Data.Count;
                    $scope.examDetailData = response.Data;

                });
        };
        $scope.$watch('paginationConf.currentPage', function() {
            var options = {};
            options.page = $scope.paginationConf.currentPage;
            $scope.requestExamDetail(options);
        });
    });
