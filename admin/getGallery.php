<?php
require_once __DIR__ . '/../middlware/provider.php';
header('Content-Type: application/json');
$data = $pdo->prepare("SELECT * FROM `gallery`");
$data->execute();
$res = $data->FetchAll(PDO::FETCH_ASSOC);
$response = [];
foreach($res as $item)
{
    $response[] = [
        "id"=> $item["id"],
        "name"=> $item["name"],
        "img"=> $item["img"]
    ];
}
echo json_encode($response);
