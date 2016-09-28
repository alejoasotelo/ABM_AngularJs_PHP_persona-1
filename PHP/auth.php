<?php
include_once './clases/Usuario.php';
include_once './vendor/autoload.php';
use \Firebase\JWT\JWT;


$key = "example_key";
/*
$token = array(
    "iss" => "http://example.org",
    "aud" => "http://example.com",
    "iat" => 1356999524,
    "nbf" => 1357000000
);
*/
/**
 * IMPORTANT:
 * You must specify supported algorithms for your application. See
 * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40
 * for a list of spec-compliant algorithms.
 */
$request_body = file_get_contents('php://input');
$user_login = json_decode($request_body);

$ret = array();

if(Usuario::validarUsuario($user_login->username, $user_login->password))
{
	$user = Usuario::getUsuarioByUsername($user_login->username);

	$key = "1234";
	$token["iat"] = time() ;
	$token["exp"] = time() + 20;

	$token["username"] = $user->username;
	$token["nombre"] = $user->nombre;
	$token["tipoUsuario"] = $user->tipoUsuario;

	$jwt = JWT::encode($token, $key);

	$ret["mitoken"] = $jwt;
} else {
	$ret["mitoken"] = false;
}

echo json_encode($ret);
?>
