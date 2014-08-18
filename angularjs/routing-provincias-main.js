/*
JS - Provincias Detalle. Routing+JSON
*/

var provinciasApp = angular.module('provinciasApp', ['ngRoute']);

/*
Configuramos el routing. Según el parámetro de la URL, cargamos uno u otro template
y ejecutamos su controlador correspondiente para que cargue en el template la información
*/provinciasApp.config(function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'routing-provincias-list.html',
            controller: 'ProvinciasListCtrl'
          }).
          when('/:provinciaNombre', {
            templateUrl: 'routing-provincias-detail.html',
            controller: 'ProvinciasDetailCtrl'
          }).
          otherwise({
            redirectTo: '/'
          });
});


/*
Este servicio admite dos métodos, list & find, para listar todas o buscar 
una provincia en particular
*/
provinciasApp.factory('provServ', function($http){
        return {
          list: function(callback){
            $http.get('provins.json').success(callback);
          },
          find: function(name, callback){
            $http.get('provins.json').success(function(data) {
              var provincia = data.filter(function(entry){
                return entry.name === name;
              })[0];
              callback(provincia);
            });
          }
        };
});


provinciasApp.factory('provServCache', function($http){

        var cachedData;
        function getData(callback){
          if(cachedData) {
            callback(cachedData);
          } else {
            $http.get('provins.json').success(function(data){
              cachedData = data;
              callback(data);
            });
          }
        }

        return {
          list: getData,
          find: function(name, callback){
            getData(function(data) {
              var provincia = data.filter(function(entry){
                return entry.name === name;
              })[0];
              callback(provincia);
            });
          }
        };
});



provinciasApp.factory('provServCache2', function($http){

        function getData(callback){
          $http({
            method: 'GET',
            url: 'provins.json',
            cache: true
          }).success(callback);
        }

        return {
          list: getData,
          find: function(name, callback){
            getData(function(data) {
              var provincia = data.filter(function(entry){
                return entry.name === name;
              })[0];
              callback(provincia);
            });
          }
        };
});

/*
Controller para la carga de la lista de provincias.
*/
provinciasApp.controller('ProvinciasListCtrl', function ($scope, provServCache2){
  provServCache2.list(function(provincias) {
          $scope.provincias = provincias;
  });
});

/*
Controller para mostrar la información de detalle de una provincia
*/
provinciasApp.controller('ProvinciasDetailCtrl', function ($scope, $routeParams, provServCache2){
  provServCache2.find($routeParams.provinciaNombre, function(provincia) {
          $scope.provinciaDetail = provincia;
  });
});
 

provinciasApp.filter('encodeURI', function(){
        return window.encodeURI;
      });


