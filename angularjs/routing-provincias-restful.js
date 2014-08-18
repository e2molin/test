/*
JS - Provincias Detalle. Routing+JSON
*/

var provinciasApp = angular.module('provinciasApp', ['ngRoute']);

/*
Configuramos el routing. Según el parámetro de la URL, cargamos uno u otro template
y ejecutamos su controlador correspondiente para que cargue en el template la información
*/
provinciasApp.config(function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'routing-provincias-list.html',
            controller: 'ProvinciasListCtrl'
          }).
          when('/:provinciaId', {
            templateUrl: 'routing-provincias-detail.html',
            controller: 'ProvinciasDetailCtrl'
          }).
          otherwise({
            redirectTo: '/'
          });
});


/*
Este servicio admite dos métodos, list & find, para listar todas o buscar 
una provincia en particular. Simula cómo funcionaría un servicio RESTful
*/
provinciasApp.factory('provServCacheRESTful', function($http){
        return {
          list: function (callback){
            $http({
              method: 'GET',
              url: 'data/provincias/provincias.json',
              cache: true
            }).success(callback);
          },
          find: function(id, callback){
            $http({
              method: 'GET',
              url: 'data/provincias/provincia_' + id + '.json',
              cache: true
            }).success(callback);
          }
        };
      });
/*
Vamos a crear una directiva de tipo atributo
*/

provinciasApp.directive('provinciaDir', function(){
        return {
          scope: {
            provinciaDir: '='
          },
          restrict: 'A',
          templateUrl: 'routing-provincias-directive.html'
        };
      });




/*
Controller para la carga de la lista de provincias.
*/
provinciasApp.controller('ProvinciasListCtrl', function ($scope, provServCacheRESTful){
  provServCacheRESTful.list(function(provincias) {
          $scope.provincias = provincias;
  });
});

/*
Controller para mostrar la información de detalle de una provincia
*/
provinciasApp.controller('ProvinciasDetailCtrl', function ($scope, $routeParams, provServCacheRESTful){
  provServCacheRESTful.find($routeParams.provinciaId, function(provincia) {
          $scope.provinciaDetail = provincia;
  });
});
 

provinciasApp.filter('encodeURI', function(){
  return window.encodeURI;
});


