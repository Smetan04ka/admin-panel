<?php
require_once __DIR__ . '/../middlware/provider.php';
header('Content-Type: application/json');
try {
    $data = $pdo->prepare("DELETE FROM `gallery` WHERE `id` = :id");
    $data->execute(array("id" => (int)$_POST["id"]));
    echo json_encode('Картинка удалена');
} catch (Exception $e) {
    echo json_encode($e->getMessage());
}
