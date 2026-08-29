<?php

require_once 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

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
$rawMobile = $_POST['user_mobile'] ?? $_POST['userMobile'] ?? $jsonData['user_mobile'] ?? $jsonData['userMobile'] ?? '';
$digits = bdapps_normalize_mobile($rawMobile);

if (!preg_match('/^01[3-9][0-9]{8}$/', $digits)) {
    echo json_encode(['success' => false, 'message' => 'Invalid mobile number format. Must start with 01.', 'referenceNo' => null]);
    exit;
}

$subscriberId = 'tel:88' . $digits;

$requestData = [
    'applicationId' => BDAPPS_APP_ID,
    'password' => BDAPPS_APP_PASSWORD,
    'subscriberId' => $subscriberId,
    'applicationHash' => BDAPPS_APP_HASH,
    'applicationMetaData' => [
        'client' => 'MOBILEAPP',
        'device' => 'WatchLog Android',
        'os' => 'android',
        'appCode' => 'com.neo.watchlog'
    ]
];

$ch = curl_init(rtrim(BDAPPS_BASE_URL, '/') . '/subscription/otp/request');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$responseJson = curl_exec($ch);

if ($responseJson === false) {
    $error = curl_error($ch);
    curl_close($ch);
    echo json_encode(['success' => false, 'message' => 'Connection error: ' . $error, 'referenceNo' => null]);
    exit;
}
curl_close($ch);

$response = json_decode($responseJson, true);

if (!is_array($response)) {
    echo json_encode(['success' => false, 'message' => 'Invalid server response from BDApps', 'referenceNo' => null]);
    exit;
}

$referenceNo = trim((string)($response['referenceNo'] ?? ''));

if ($referenceNo !== '') {
    echo json_encode([
        'success' => true,
        'referenceNo' => $referenceNo,
        'statusCode' => $response['statusCode'] ?? 'S1000',
        'statusDetail' => $response['statusDetail'] ?? 'Success',
        'version' => $response['version'] ?? '1.0'
    ]);
    exit;
}

echo json_encode([
    'success' => false,
    'message' => $response['statusDetail'] ?? 'OTP reference not returned by BDApps',
    'referenceNo' => null,
    'statusCode' => $response['statusCode'] ?? '',
    'subscriberId' => $subscriberId
]);
