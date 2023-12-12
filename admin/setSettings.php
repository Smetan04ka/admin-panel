<?php
require_once __DIR__ . '/../middlware/provider.php';
header('Content-Type: application/json');
try {
    $data = $pdo->prepare("SELECT * FROM `settings`");
    $data->execute();
    if ($data->rowCount() > 0) {
        $update = $pdo->prepare("UPDATE `settings` SET `title` = :title , `email` = :email WHERE `id` = 1");
        $update->execute(array('title' => $_POST['title'], 'email' => $_POST['email']));
    } else {
        $create = $pdo->prepare('INSERT INTO `settings` SET `title`=:title,`email`=:email');
        $create->execute(array('title' => $_POST['title'], 'email' => $_POST['email']));
    }
    echo json_encode('Данные изменены');
} catch (PDOException $e) {
    echo json_encode($e->getMessage());
}
