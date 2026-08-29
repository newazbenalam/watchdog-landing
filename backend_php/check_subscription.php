<?php

require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function bdapps_normalize_mobile($raw) {
    $digits = preg_replace('/\D+/', '', $raw);
    if (strpos($digits, '880') === 0 && strlen($digits) === 13) {
        $digits = '0' . substr($digits, 3);
    } elseif (strpos($digits, '88') === 0 && strlen($digits) === 12) {
        $digits = '0' . substr($digits, 2);
    }
    return $digits;
}

$rawInput = file_get_contents('php://input');
$jsonData = json_decode($rawInput, true);

$rawMobile = $_POST['user_mobile'] ?? $_POST['userMobile'] ?? $_GET['user_mobile'] ?? $_GET['userMobile'] ?? $jsonData['user_mobile'] ?? $jsonData['userMobile'] ?? $jsonData['subscriberId'] ?? '';
$digits = bdapps_normalize_mobile($rawMobile);

if (!preg_match('/^01[3-9][0-9]{8}$/', $digits)) {
    echo json_encode(['error' => 'Invalid mobile number format', 'isSubscribed' => false, 'subscriptionStatus' => 'UNKNOWN']);
    exit;
}

$subscriberId = 'tel:88' . $digits;

$requestData = [
    'version' => '1.0',
    'applicationId' => BDAPPS_APP_ID,
    'password' => BDAPPS_APP_PASSWORD,
    'subscriberId' => $subscriberId
];

$ch = curl_init(rtrim(BDAPPS_BASE_URL, '/') . '/subscription/getStatus');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$responseJson = curl_exec($ch);
$curlError = curl_error($ch);
curl_close($ch);

if ($responseJson === false) {
    echo json_encode(['error' => 'Connection failed', 'details' => $curlError, 'isSubscribed' => false, 'subscriptionStatus' => 'UNKNOWN']);
    exit;
}

$response = json_decode($responseJson, true);

if (!is_array($response)) {
    echo json_encode(['error' => 'Invalid response from BDApps', 'isSubscribed' => false, 'subscriptionStatus' => 'UNKNOWN']);
    exit;
}

$status = rtrim(strtoupper(trim($response['subscriptionStatus'] ?? '')), '.');

echo json_encode([
    'subscriptionStatus' => $status ?: 'UNKNOWN',
    'isSubscribed' => ($status === 'REGISTERED'),
    'statusCode' => $response['statusCode'] ?? null,
    'statusDetail' => $response['statusDetail'] ?? null,
    'version' => $response['version'] ?? '1.0',
    'subscriberId' => $subscriberId
]);
