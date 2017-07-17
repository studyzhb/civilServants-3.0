'use strict';

/**
 * @ngdoc function
 * @name luZhouApp.controller:MyfavoriteCtrl
 * @description
 * # MyfavoriteCtrl
 * Controller of the luZhouApp
 */
angular.module('luZhouApp')
  .controller('MyfavoriteCtrl', function ($scope, $timeout, $rootScope, $cookieStore, commonService, $location, $loading) {
    //退出
    $scope.loginOut = commonService.loginOut;
    //请求用户信息
    $loading.start('loginOut');
    commonService.getData(ALL_PORT.LoginLong.url, 'POST', ALL_PORT.LoginLong.data)
      .then(function (response) {
        $loading.finish('loginOut');
        $scope.userMessage = response.Data;
      });

    $scope.token = commonService.AntiForgeryToken();
    //我的收藏
    $scope.paginationConf = $.extend({}, paginationConf, {itemsPerPage: ALL_PORT.MyFavorite.data.rows});
    $scope.requestMyStudyStat = function (options) {
      $loading.start('myFavorite');
      var params = $.extend({}, ALL_PORT.MyFavorite.data, options);
      commonService.getData(ALL_PORT.MyFavorite.url, 'POST',
        params)
        .then(function (response) {
          $loading.finish('myFavorite');
          $scope.paginationConf.totalItems = response.Data.Count;
          $scope.myFavoriteData = response.Data;

        });
    };
    $scope.$watch('paginationConf.currentPage', function () {
      var options = {};
      options.page = $scope.paginationConf.currentPage;
      $scope.requestMyStudyStat(options);
    });


    $scope.favoriteDelete = function (options, token) {
      var favoriteDelete = function () {
        var params = $.extend({}, ALL_PORT.FavoriteDelete.data, options, token)
        commonService.getData(ALL_PORT.FavoriteDelete.url, 'POST',
          params)
          .then(function (response) {
            if (response.Type == 1) {
              alert(response.Message);
              $scope.requestMyStudyStat();
            }
          });
      };

      commonService.limitSubmit(favoriteDelete);

    }
  });
