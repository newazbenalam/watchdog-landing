<?php

require_once 'config.php';

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$rawInput = file_get_contents('php://input');
$jsonData = json_decode($rawInput, true);

$otp = trim((string)($_POST['Otp'] ?? $_POST['otp'] ?? $jsonData['Otp'] ?? $jsonData['otp'] ?? ''));
$referenceNo = trim((string)($_POST['referenceNo'] ?? $_POST['reference_no'] ?? $jsonData['referenceNo'] ?? $jsonData['reference_no'] ?? ''));

if ($otp === '' || $referenceNo === '') {
    echo json_encode(['statusCode' => 'FAILED', 'message' => 'Missing OTP or referenceNo', 'success' => false]);
    exit;
}

$requestData = [
    'applicationId' => BDAPPS_APP_ID,
    'password' => BDAPPS_APP_PASSWORD,
    'referenceNo' => $referenceNo,
    'otp' => $otp
];

$ch = curl_init(rtrim(BDAPPS_BASE_URL, '/') . '/subscription/otp/verify');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

$responseJson = curl_exec($ch);

if ($responseJson === false) {
    $error = curl_error($ch);
    curl_close($ch);
    echo json_encode(['statusCode' => 'FAILED', 'message' => 'Connection error: ' . $error, 'success' => false]);
    exit;
}
curl_close($ch);

$response = json_decode($responseJson, true);

if (!is_array($response)) {
    echo json_encode(['statusCode' => 'FAILED', 'message' => 'Invalid server response from BDApps', 'success' => false]);
    exit;
}

$statusCode = $response['statusCode'] ?? 'FAILED';
$subscriptionStatus = strtoupper(trim($response['subscriptionStatus'] ?? ''));
$isRegistered = ($statusCode === 'S1000' && $subscriptionStatus === 'REGISTERED');

echo json_encode([
    'statusCode' => $statusCode,
    'statusDetail' => $response['statusDetail'] ?? '',
    'subscriptionStatus' => $response['subscriptionStatus'] ?? '',
    'subscriberId' => $response['subscriberId'] ?? '',
    'version' => $response['version'] ?? '1.0',
    'success' => $isRegistered
]);
