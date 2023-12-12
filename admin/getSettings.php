<?php
require_once __DIR__ . '/../middlware/provider.php';
header('Content-Type: application/json');

$data = $pdo->prepare("SELECT * FROM `settings`");
$data->execute();
$value = $data->fetch(PDO::FETCH_ASSOC);
$response = [
    'id'=>$value['id'],
    'title'=> $value['title'],
    'email'=> $value['email']
];
echo json_encode($response);

