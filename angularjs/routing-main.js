// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

	//Según el enlace pulsado, sabemos que vista cargar y que controlador utilizar para interactuar
    $routeProvider
        .when('/', {
            templateUrl	: 'routing-template3.html',
            controller 	: 'mainController'
        })
        .when('/acerca', {
            templateUrl : 'routing-template1.html',
            controller 	: 'aboutController'
        })
        .when('/contacto', {
            templateUrl : 'routing-template2.html',
            controller 	: 'contactController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

angularRoutingApp.controller('mainController', function($scope) {
    $scope.message = 'Hola, Mundo!';
});

angularRoutingApp.controller('aboutController', function($scope) {
    $scope.message = 'Esta es la página "Acerca de"';
});

angularRoutingApp.controller('contactController', function($scope) {
    $scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
});