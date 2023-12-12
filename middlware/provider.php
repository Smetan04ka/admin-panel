<?php 
    require_once __DIR__."/../config.php";
    
    try{
        $pdo = new PDO(
            "mysql:dbname=".DB_NAME.";host=".DB_HOST,
            DB_USER,
            DB_PASSWORD,
            array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'")
        );
    } catch (Exception $e) {
        die($e->getMessage());
    }