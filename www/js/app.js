// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function(){

var app = angular.module('starter', ['ionic'])

app.controller('ApiMarvel', function($scope,$http){

var hash = '74ef215029a27e1e6e924356427c8c6d';
var url = 'http://gateway.marvel.com/v1/public/comics?ts=1&apikey=d65e303cf9155ebe8b2221bc457c883f&hash=74ef215029a27e1e6e924356427c8c6d';

$scope.comics = [];
var offset = 0;

$http.get(url)
.success(function(promise){
   angular.forEach(promise.data.results, function(comic){
      $scope.comics.push(comic);
   })
  });
  
$scope.cargarComics = function() {

var params2 = {};

if ($scope.comics.length > 0) {

  params2['offset'] = offset + 1 ;
  offset = offset + 1 ;

}

$http.get(url,{params:params2})
.success(function(promise){
   angular.forEach(promise.data.results, function(comic){
      $scope.comics.push(comic);
   });
   $scope.$broadcast('scroll.infiniteScrollComplete');
  });

console.log(offset);

}


  
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

}());
