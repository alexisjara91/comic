
(function(){

var app = angular.module('starter', ['ionic'])


var comics = [];


function getComic(id){
  return comics.filter(function(comic){
    return comic.id == id;
  })[0];
}

//Rutas

app.config(function($stateProvider,$urlRouterProvider) {
  $stateProvider.state('comics', {
    url:'/comics',
    templateUrl:'templates/comics.html'
  });
  $stateProvider.state('descripcion',{
    url:'/descripcion/:id',
    templateUrl:'templates/descripcion.html'
  });
  $urlRouterProvider.otherwise('/comics');
});

//Controlador Comics Principal

app.controller('listacomics', function($scope,$http){

var hash = '74ef215029a27e1e6e924356427c8c6d';
var url = 'https://gateway.marvel.com/v1/public/comics?ts=1&apikey=d65e303cf9155ebe8b2221bc457c883f&hash=74ef215029a27e1e6e924356427c8c6d&orderBy=title';

$scope.comics = [];
var offset = 0;

$http.get(url)
.success(function(promise){
   angular.forEach(promise.data.results, function(comic){
      $scope.comics.push(comic);
      comics.push(comic);
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
      comics.push(comic);
   });
   $scope.$broadcast('scroll.infiniteScrollComplete');
  });
}

});

//Controlador descripción

app.controller('descripcioncomic',  function($scope,$state){
  $scope.id = $state.params.id;
  $scope.comic = getComic($scope.id);
  console.log($scope.comic);
});

//RUN

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
