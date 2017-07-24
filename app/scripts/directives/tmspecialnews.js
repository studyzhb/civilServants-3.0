'use strict';

/**
 * @ngdoc directive
 * @name luZhouApp.directive:tmSpecialNews
 * @description
 * # tmSpecialNews
 */
angular.module('luZhouApp')
  .directive('tmSpecialNews', function () {
    return {
      templateUrl: 'components/tmSpecialNews.html',
      restrict: 'EA',
      scope:{
        specialNewsData:'='
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
