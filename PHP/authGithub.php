<?php
include_once './clases/Usuario.php';
include_once './clases/AuthGithub.php';
include_once './vendor/autoload.php';
use \Firebase\JWT\JWT;

$request_body = file_get_contents('php://input');
$request = json_decode($request_body);

// Si recibo el code entro.
if (isset($request->code)) {
	
	// Obtengo el access token a partir del code.
	$auth = AuthGithub::getAccessTokenFromCode($request->code);

	// Obtengo la informacion del usuario.
	$github_user = AuthGithub::getUserInfo($auth->access_token);

	$existeUsername = Usuario::existeUsuario($github_user->login);
	$existeIdGithub = Usuario::existeUsuarioGithub($github_user->id);

	// Chequeo que no exista el username en la base de datos.
	if (!$existeUsername || $existeIdGithub) {

		if (!$existeIdGithub) {
			// Como no existe agrego el usuario de github.
			Usuario::insertarUsuarioGithub($github_user);
		}

		// Obtengo el nuevo usuario de mi base de datos.
		$user = Usuario::getUsuarioByIdGithub($github_user->id);

		$key = '1234';
		$token['iat'] = time() ;
		$token['exp'] = time() + 60; // 1 minuto

		$token['username'] = $user->username;
		$token['nombre'] = $user->nombre;
		$token['tipoUsuario'] = $user->tipoUsuario;
		$token['github'] = $github_user;

		$jwt = JWT::encode($token, $key);

		$ret['mitoken'] = $jwt;
	} else {
		$ret["mitoken"] = false;
		$ret['error'] = 'Ya existe un usuario con el username: ' . $github_user->login;
	}
	
	echo json_encode($ret);
}
die();
