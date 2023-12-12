<?php

require_once __DIR__ . '/../middlware/Validate.php';
require_once __DIR__ . '/../middlware/provider.php';

header('Content-Type: application/json');

$errors = [];
$login = $_POST['login'];
$password = $_POST['password'];

$response = [
  'success' => null,
  'errors' => []
];

if (empty($login) || empty($password)) {
  $response['errors'][] = 'Все поля должны быть заполнены';
}

$admin = $pdo->prepare("SELECT * FROM `admin` WHERE `login` = :login AND `password` = :password");
$admin->execute(array('login' => $login, 'password' => $password));

if ($admin->rowCount() == 0) {
  $response['errors'][] = "Неверный логин или пароль";
}
if (empty($response['errors'])) {
  $response['success'] = "Добро пожаловать!!!";
  $_SESSION['is_admin'] = true;
  header("Refresh:0");
}

print_r(json_encode($response));
