<?php
require_once"accesoDatos.php";
class Usuario
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
	public $nombre;
    public $username;
    public $password;
    public $email;
    public $tipoUsuario;
    public $id_github;

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
  public function GetId()
  {
      return $this->id;
  }
  public function GetNombre()
  {
      return $this->nombre;
  }
  public function GetUsername()
  {
      return $this->username;
  }
  public function GetPassword()
  {
      return $this->password;
  }
  public function GetEmail()
  {
      return $this->email;
  }
  public function GetTipoUsuario()
  {
      return $this->tipoUsuario;
  }
  public function GetIdGithub()
  {
      return $this->id_github;
  }

  public function SetId($valor)
  {
      $this->id = $valor;
  }
  public function SetNombre($valor)
  {
      $this->nombre = $valor;
  }
  public function SetUsername($valor)
  {
      $this->username = $valor;
  }
  public function SetPassword($valor)
  {
      $this->password = $valor;
  }
  public function SetEmail($valor)
  {
      $this->email = $valor;
  }
  public function SetTipoUsuario($valor)
  {
      $this->tipoUsuario = $valor;
  }
  public function SetIdGithub($valor)
  {
      $this->id_github = $valor;
  }
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
  public function __construct($id=NULL)
  {
      if($id != NULL){
         $obj = Usuario::TraerUnUsuario($id);

         $this->id = $id;
         $this->nombre = $obj->nombre;
         $this->username = $obj->username;
         $this->password = $obj->password;
         $this->tipoUsuario = $obj->tipoUsuario;
         $this->email = $obj->email;
         $this->github = $obj->github;
     }
 }

//--------------------------------------------------------------------------------//
//--TOSTRING	
 public function ToString()
 {
    return $this->id."-".$this->nombre."-".$this->tipoUsuario;
}
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--METODO DE CLASE
public static function TraerUnUsuario($idParametro) 
{	


  $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario where id =:id");
  $consulta = $objetoAccesoDato->RetornarConsulta("CALL TraerUnUsuario(:id)");
  $consulta->bindValue(':id', $idParametro, PDO::PARAM_INT);
  $consulta->execute();
  $usuarioBuscada = $consulta->fetchObject('usuario');
  return $usuarioBuscada;	

}

public static function TraerTodasLosUsuarios()
{
  $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario");
  $consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLosUsuarios() ");
  $consulta->execute();			
  $arrUsuarios= $consulta->fetchAll(PDO::FETCH_CLASS, "usuario");	
  return $arrUsuarios;
}

public static function BorrarUsuario($idParametro)
{	
  $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from usuario	WHERE id=:id");	
  $consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarUsuario(:id)");	
  $consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
  $consulta->execute();
  return $consulta->rowCount();

}

public static function ModificarUsuario($usuario)
{
 $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			/*$consulta =$objetoAccesoDato->RetornarConsulta("
				update usuario 
				set nombre=:nombre,
				apellido=:apellido,
				foto=:foto
				WHERE id=:id");
             $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();*/ 
             $consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarUsuario(:id,:nombre,:password,:tipoUsuario)");
             $consulta->bindValue(':id',$usuario->id, PDO::PARAM_INT);
             $consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
             $consulta->bindValue(':password', md5($usuario->password), PDO::PARAM_STR);
             $consulta->bindValue(':tipoUsuario', $usuario->foto, PDO::PARAM_STR);
             return $consulta->execute();
         }

//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//

         public static function InsertarUsuario($usuario)
         {
          $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into usuario (nombre,apellido,dni,foto)values(:nombre,:apellido,:dni,:foto)");
          $consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarUsuario (:nombre,:password,:tipoUsuario)");
          $consulta->bindValue(':nombre',$usuario->nombre, PDO::PARAM_STR);
          $consulta->bindValue(':password', md5($usuario->password), PDO::PARAM_STR);
          $consulta->bindValue(':tipoUsuario', $usuario->tipoUsuario, PDO::PARAM_STR);
          $consulta->execute();		
          return $objetoAccesoDato->RetornarUltimoIdInsertado();


      }	
//--------------------------------------------------------------------------------//



      public static function TraerUsuariosTest()
      {
          $arrayDeUsuarios=array();

          $usuario = new stdClass();
          $usuario->id = "4";
          $usuario->nombre = "rogelio";
          $usuario->password = "agua";
          $usuario->tipoUsuario = "333333";

		//$objetJson = json_encode($usuario);
		//echo $objetJson;
          $usuario2 = new stdClass();
          $usuario2->id = "5";
          $usuario2->nombre = "Bañera";
          $usuario2->password = "giratoria";
          $usuario2->tipoUsuario = "222222";

          $usuario3 = new stdClass();
          $usuario3->id = "6";
          $usuario3->nombre = "Julieta";
          $usuario3->password = "Roberto";
          $usuario3->tipoUsuario = "888888";

          $arrayDeUsuarios[]=$usuario;
          $arrayDeUsuarios[]=$usuario2;
          $arrayDeUsuarios[]=$usuario3;

          return  $arrayDeUsuarios;				
      }	

    public static function validarUsuario($username, $password) {
        $ret = false;

        $existe = self::existeUsuario($username);

        if ($existe) {
            $usuario = self::getUsuarioByUsername($username);

            if ($usuario->username == $username && $usuario->password == md5($password)) {
                $ret = true;
            }
        }          

        return $ret;
    }

     public static function existeUsuario($username) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE username = :username");
        $consulta->bindValue(':username', $username);
        $consulta->execute();

        $user = $consulta->fetchObject('usuario');
        return isset($user->id) && $user->id > 0;        
    }

    public static function getUsuarioByUsername($username) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE username = :username");
        $consulta->bindValue(':username', $username);
        $consulta->execute();

        $user = $consulta->fetchObject('usuario');
        return $user;        
    }

     public static function existeUsuarioGithub($id_github) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE id_github = :id_github");
        $consulta->bindValue(':id_github', $id_github);
        $consulta->execute();

        $user = $consulta->fetchObject('usuario');
        return isset($user->id) && $user->id > 0;        
    }

    public static function insertarUsuarioGithub($user) {
        $sql = 'INSERT INTO usuarios (id_github, nombre, username, tipoUsuario) 
                VALUES (:id_github, :nombre, :username, :tipoUsuario)';

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

        $consulta = $objetoAccesoDato->RetornarConsulta($sql);
        $consulta->bindValue(':id_github',$user->id, PDO::PARAM_STR);
        $consulta->bindValue(':nombre',$user->name, PDO::PARAM_STR);
        $consulta->bindValue(':username',$user->login, PDO::PARAM_STR);
        $consulta->bindValue(':tipoUsuario', 'github', PDO::PARAM_STR);
        $consulta->execute();  

        return $objetoAccesoDato->RetornarUltimoIdInsertado();       
    }

    public static function getUsuarioByIdGithub($id_github) {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM usuarios WHERE id_github = :id_github");
        $consulta->bindValue(':id_github', $id_github);
        $consulta->execute();

        $user = $consulta->fetchObject('usuario');
        return $user;
    }
}
