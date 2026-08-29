<?php

date_default_timezone_set("Asia/Dhaka");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

$timeStamp = $data['timeStamp'] ?? date('Y-m-d H:i:s');
$status = $data['status'] ?? '';
$applicationId = $data['applicationId'] ?? '';
$subscriberId = $data['subscriberId'] ?? '';
$frequency = $data['frequency'] ?? '';

$log = date('Y-m-d H:i:s') . " | TimeStamp:$timeStamp | Status:$status | AppId:$applicationId | SubscriberId:$subscriberId | Frequency:$frequency\n";
@file_put_contents(__DIR__ . '/subscription_notifications.log', $log, FILE_APPEND);

echo json_encode(['statusCode' => 'S1000', 'statusDetail' => 'Notification received']);
