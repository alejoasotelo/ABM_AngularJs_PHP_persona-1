angular.module('Aplicacion')

.controller('ControlJuegosAdivinaElNumero2', function($scope){

	$scope.juego = {};

	$scope.comenzar = function(){

		$scope.resetearRespuestaIngresada();
		$scope.juego.resp_correcta = Math.floor(Math.random()*100);
		$scope.juego.intentos = null;

	}

	$scope.verificar = function(){

		if ($scope.juego.resp_ingresada == $scope.juego.resp_correcta)
		{
			$scope.mostrarMensajeSegunIntentos($scope.juego.intentos);
			$scope.comenzar();
		}
		else
		{
			if ($scope.juego.resp_ingresada > $scope.juego.resp_correcta)
				alert('Te pasaste...');
			else
				alert('Te falto...');

			$scope.resetearRespuestaIngresada();

			$scope.juego.intentos = $scope.juego.intentos == null ? 1 : $scope.juego.intentos+1;

		}
	};

	$scope.mostrarMensajeSegunIntentos = function (intentos){

		if (intentos == 1)
			alert('¡Usted es un Psíquico!');
		else if (intentos == 2)
			alert('¡Excelente percepción!');
		else if (intentos == 3)
			alert('¡Esto es suerte!');
		else if (intentos == 4)
			alert('¡Excelente técnica!');
		else if (intentos == 5)
			alert('¡Usted está en la media!');
		else if (intentos >= 6 && intentos <= 10)
			alert('¡Falta técnica!');
		else if  (intentos > 10)
			alert('¡Afortunado en el amor!');
	}

	$scope.resetearRespuestaIngresada = function(){

		$scope.juego.resp_ingresada = null;

	}

	$scope.comenzar();

});