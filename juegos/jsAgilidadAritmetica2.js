angular.module('Aplicacion')

.controller('ControlJuegosAgilidadAritmetica2', function($scope, $timeout, $auth, $state){

	$scope.isAuthenticated = $auth.isAuthenticated();

	if (!$scope.isAuthenticated) {
		$state.go('login_register.login');
	}

	var operaciones = ['+', '-', '*', '/'],
	timer = null;

	$scope.juego = {};

	$scope.Comenzar = function(){
		console.log('comenzo');

		$scope.juego.numeros = $scope.generarNumerosYOperador();

		$scope.juego.respuesta_usuario = null;

		timer = $timeout(function(){
			$scope.Responder();
		}, 4000);
	}

	$scope.generarNumerosYOperador = function(){

		return {
			uno: $scope.generarNumeroRandomEntre(1, 10),
			dos: $scope.generarNumeroRandomEntre(1, 10),
			operador: operaciones[$scope.generarNumeroRandomEntre(0, 3)]
		}

	}

	$scope.generarNumeroRandomEntre = function(min, max){

		return Math.floor(Math.random() * (max - (min - 1) ) ) + min;

	}

	$scope.Responder = function(){

		if (timer != null)
			$timeout.cancel(timer);

		var resultado = $scope.calcularResultado();

		if ($scope.juego.respuesta_usuario == resultado)
			alert('¡Respuesta acertada!');
		else
			alert('Respuesta equivocada. El resultado correcto es: ' + resultado);

		$scope.Comenzar();

	}

	$scope.calcularResultado = function(){

		var resultado = 0;

		if ($scope.juego.numeros.operador == '+')
			resultado = ($scope.juego.numeros.uno + $scope.juego.numeros.dos);
		else if ($scope.juego.numeros.operador == '-')
			resultado = ($scope.juego.numeros.uno - $scope.juego.numeros.dos);
		else if ($scope.juego.numeros.operador == '*')
			resultado = ($scope.juego.numeros.uno * $scope.juego.numeros.dos);
		else if ($scope.juego.numeros.operador == '/')
			resultado = ($scope.juego.numeros.uno / $scope.juego.numeros.dos);

		return Math.floor(resultado);

	}
	
	$scope.$on('$destroy',function(){
		if (timer != null)
			$timeout.cancel(timer);  
	});

});