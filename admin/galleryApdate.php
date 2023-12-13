<?php
require_once __DIR__ . '/../middleware/provider.php';

header('Content-Type: application/json');
// Папка, куда будут загружаться картинки
$uploadDir = 'src/img/'; // Убедитесь, что эта папка существует и доступна для записи
$response = array();     // Массив для ответа

// Проверяем, был ли файл загружен без ошибок
if ($_FILES['file']['error'] == UPLOAD_ERR_OK) {
    $tmpName = $_FILES['file']['tmp_name']; // Путь к временному файлу
    $fileName = basename($_FILES['file']['name']); // Имя файла
    $uploadFile = $uploadDir . $fileName; // Полный путь к будущему файлу на сервере

    // Пытаемся переместить загруженный файл из временной папки в конечную директорию
    if (move_uploaded_file($tmpName, $uploadFile)) {
        $response['status'] = 'success';
        $response['message'] = 'Файл успешно загружен.';
        $response['url'] = $uploadFile; // URL к загруженному файлу
    } else {
        // Если не удалось переместить файл
        $response['status'] = 'error';
        $response['message'] = 'Не удалось сохранить файл.';
    }
} else {
    // Если файл не был загружен или есть ошибки
    $response['status'] = 'error';
    $response['message'] = 'Ошибка загрузки файла.';
}

// Отправляем ответ в формате  JSON

echo json_encode($response);
