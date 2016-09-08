var miAplicacion = angular.module('Aplicacion', ['ui.router']);

miAplicacion.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
	.state('inicio', {
		url: '/inicio',
		templateUrl: 'inicio.html',
		controller: 'ControlInicio'
	})
	.state('persona', {
		url: '/persona',
		abstract: true,
		templateUrl: 'abstractPersona.html',
		controller: 'ControlPersona'
	})
	.state('persona.menu', {
		url: '/menu',
		views: {
			'contenido': {
				templateUrl: 'personaMenu.html',
				controller: 'ControlPersonaMenu'
			} 
		}
	})
	.state('persona.alta', {
		url: '/alta',
		views: {
			'contenido': {
				templateUrl: 'personaAlta.html',
				controller: 'ControlPersonaAlta'
			} 
		}
	})
	.state('persona.grilla', {
		url: '/grilla',
		views: {
			'contenido': {
				templateUrl: 'personaGrilla.html',
				controller: 'ControlPersonaGrilla'
			} 
		}
	})

	$urlRouterProvider.otherwise('/inicio');

});

miAplicacion.controller('ControlInicio', function($scope){

});

miAplicacion.controller('ControlPersona', function($scope){

});

miAplicacion.controller('ControlPersonaMenu', function($scope, $state){

	$scope.irAAlta = function(){

		$state.go('persona.alta');

	}

});

miAplicacion.controller('ControlPersonaAlta', function($scope){

});

miAplicacion.controller('ControlPersonaGrilla', function($scope){

});
