<?php
require_once __DIR__ . '/../middlware/provider.php';
header('Content-Type: application/json');

$data = $pdo->prepare("SELECT * FROM `gallery` WHERE `id`=:id");
$data->execute(array("id"=>(int)$_POST['id']));
$responce = $data->fetch(PDO::FETCH_ASSOC);
echo json_encode($responce);