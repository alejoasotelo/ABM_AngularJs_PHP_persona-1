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

	// States Login & Register
	.state('login_register', {
		url: '/login_register',
		abstract: true,
		templateUrl: 'abstractLoginRegister.html',
		controller: 'ControlLoginRegister'
	})
	.state('login_register.login', {
		url: '/login',
		views: {
			'contenido': {
				templateUrl: 'login.html',
				controller: 'ControlLoginRegisterLogin'
			}
		}
	})
	.state('login_register.register', {
		url: '/register',
		views: {
			'contenido': {
				templateUrl: 'register.html',
				controller: 'ControlLoginRegisterRegister'
			}
		}
	})

	// States Juegos
	.state('juegos', {
		url: '/juegos',
		abstract: true,
		templateUrl: 'abstractJuegos.html',
		controller: 'ControlJuegos'
	})
	.state('juegos.grilla', {
		url: '/grilla',
		views: {
			'contenido' : {
				templateUrl: 'juegosGrilla.html',
				controller: 'ControlJuegosGrilla'
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

miAplicacion.controller('ControlLoginRegister', function($scope){});

miAplicacion.controller('ControlLoginRegisterLogin', function($scope){});

miAplicacion.controller('ControlLoginRegisterRegister', function($scope){});

miAplicacion.controller('ControlJuegos', function($scope){});

miAplicacion.controller('ControlJuegosGrilla', function($scope){});