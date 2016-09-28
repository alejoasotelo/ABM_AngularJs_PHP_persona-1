<?php
class AuthGithub{

	// Devuelvo un objeto con la respuesta el access_token
	public static function getAccessTokenFromCode($code) {
		$url = 'https://github.com/login/oauth/access_token?';
		$url .= 'client_id=54d91fb3e7642de0e04b';
		$url .= '&client_secret=cdb1e82153a2a205db005b8117dbbf2e41f80d70';
		$url .= '&code='.$code;
		$url .= '&grant_type=authorization_code';

		// Envio el request para obtener el access_token.
		$response = file_get_contents($url);

		$params = explode('&', $response);

		$oauth = new stdClass();

		// pongo las variables que me devuelve el request en la variable oauth.
		foreach ($params as $v) {
			$param = explode('=', $v);
			if (sizeof($param) == 2) {
				$oauth->{$param[0]} = $param[1];
			}
		}

		return $oauth;
	}

	// Devuelve el objeto user.
	public static function getUserInfo($access_token) {
		// Si enviar el user-agent en el header me da error forbidden.
		$options  = array('http' => array('user_agent'=> $_SERVER['HTTP_USER_AGENT']));
		$context  = stream_context_create($options);
		$result = file_get_contents('https://api.github.com/user?access_token='.$access_token, false, $context);
		return json_decode($result);
	}

}