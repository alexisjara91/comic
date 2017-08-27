
(function(){

var app = angular.module('starter', ['starter.comicstore','ionic'])


var comics = [];

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

app.controller('listacomics', function($scope,$http,comicstore){

$scope.comics = [];
$scope.offset = 0;

comicstore.getAll().then(
    function(promise){
      angular.forEach(promise.data.results, function(comic){
      $scope.comics.push(comic);
      comics.push(comic);
      })
    }
  );

$scope.cargarComics = function() {

var params2 = {};


$scope.offset = $scope.offset+20;
params2['offset'] = $scope.offset;



comicstore.getNext(params2).then(
  function(promise){
   angular.forEach(promise.data.results, function(comic){
      $scope.comics.push(comic);
      comics.push(comic);
   });
   $scope.$broadcast('scroll.infiniteScrollComplete');
  });



}

});

//Controlador descripción

app.controller('descripcioncomic', function($scope,$state,comicstore){

  $scope.comic = {};

  comicstore.getComic($state.params.id).then(
    function(promise){
        $scope.comic = promise.data.results[0];
    }
  );
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
