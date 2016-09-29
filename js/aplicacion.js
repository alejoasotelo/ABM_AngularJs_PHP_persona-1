var miAplicacion = angular.module('Aplicacion', ['ui.router', 'angularFileUpload', 'satellizer']);

miAplicacion.config(function($stateProvider, $urlRouterProvider, $authProvider){

	$authProvider.loginUrl = '/facultad/ABM_AngularJs_PHP_persona-1/PHP/auth.php';
	$authProvider.tokenName = 'mitoken';
	$authProvider.tokenPrefix = 'Aplicacion';
	$authProvider.authHeader = 'data';

	$authProvider.github({
		clientId: '54d91fb3e7642de0e04b',
		redirectUri: window.location,
		url: 'http://localhost/facultad/ABM_AngularJs_PHP_persona-1/PHP/authGithub.php',
		optionalUrlParams: ['scope'],
		scope: ['user:email']
	});

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
	.state('juegos.adivinaElNumero1', {
		url: '/adivinaElNumero1',
		views: {
			'contenido' : {
				templateUrl: 'juegos/AdivinaElNumero1.html',
				controller: 'ControlJuegosAdivinaElNumero1'
			}
		}
	})
	.state('juegos.adivinaElNumero2', {
		url: '/adivinaElNumero2',
		views: {
			'contenido' : {
				templateUrl: 'juegos/AdivinaElNumero2.html',
				controller: 'ControlJuegosAdivinaElNumero2'
			}
		}
	})
	.state('juegos.agilidadAritmetica1', {
		url: '/agilidadAritmetica1',
		views: {
			'contenido' : {
				templateUrl: 'juegos/AgilidadAritmetica1.html',
				controller: 'ControlJuegosAgilidadAritmetica1'
			}
		}
	})
	.state('juegos.agilidadAritmetica2', {
		url: '/agilidadAritmetica2',
		views: {
			'contenido' : {
				templateUrl: 'juegos/AgilidadAritmetica2.html',
				controller: 'ControlJuegosAgilidadAritmetica2'
			}
		}
	})

	$urlRouterProvider.otherwise('/inicio');

});

miAplicacion.controller('ControlInicio', function($scope, $auth, $state){

	$scope.isAuthenticated = $auth.isAuthenticated();

	if (!$scope.isAuthenticated) {
		$state.go('login_register.login');
	}

});

miAplicacion.controller('ControlPersona', function($scope){

});

miAplicacion.controller('ControlPersonaMenu', function($scope, $state){

	$scope.irAAlta = function(){

		$state.go('persona.alta');

	}

});

miAplicacion.controller('ControlPersonaAlta', function($scope, FileUploader){

	$scope.uploader = new FileUploader({url: './PHP/upload.php'});
	$scope.uploader.queueLimit = 1;
	$scope.uploader.filters.push({
		name: 'imageFilter',
		fn: function(item, options) {
			var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
			return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
		}
	});

	$scope.Guardar = function() {

		$scope.uploader.uploadAll()
		console.log($scope.persona);

	}

});

miAplicacion.controller('ControlPersonaGrilla', function($scope){

});

miAplicacion.controller('ControlLoginRegister', function($scope){});

miAplicacion.controller('ControlLoginRegisterLogin', function($scope, $auth) {

	$scope.mensajes = '';
	$scope.user = {};
	$scope.isAuthenticated = $auth.isAuthenticated();

	if ($scope.isAuthenticated) {
		$scope.user = $auth.getPayload();
	}

	$scope.iniciarSesion = function() {

		$scope.mensajes = '';

		$auth.login($scope.user).then(function(response) {

			if (response.data.mitoken != false) {

    			// Redirect user here after a successful log in.
    			$scope.isAuthenticated = $auth.isAuthenticated();
				$scope.user = $auth.getPayload();

			} else {
				$scope.mensajes = 'No se pudo iniciar sesión.';
			}

    	}).catch(function(response) {

		    console.error(response);
		
		});
    }

    $scope.iniciarSesionGithub = function() {

		$scope.mensajes = '';

    	$auth.authenticate('github').then(function(r){

    		console.log(r);

    		// Si no hay error entro.
    		if (r.data.error == undefined) {

    			// Redirect user here after a successful log in.
    			$scope.isAuthenticated = $auth.isAuthenticated();
				$scope.user = $auth.getPayload();

    		} else {

    			$scope.isAuthenticated = false;

				$scope.mensajes = r.data.error;
    		}

    	}, function(r){
    		console.error(r);
    	});

    }

    $scope.cerrarSesion = function() {

    	$auth.logout().then(function(r){
    		$scope.isAuthenticated = $auth.isAuthenticated();
			$scope.user = $auth.getPayload();
    	});

    }

});

miAplicacion.controller('ControlLoginRegisterRegister', function($scope){});

miAplicacion.controller('ControlJuegos', function($scope){
});

miAplicacion.controller('ControlJuegosGrilla', function($scope) {

});