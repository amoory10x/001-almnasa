<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data["id"])) {
    echo json_encode(["success" => false, "message" => "المعرف غير موجود"]);
    exit();
}

$conn = new mysqli("localhost", "root", "", "almnasadb");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "فشل الاتصال"]);
    exit();
}

$id = $conn->real_escape_string($data["id"]);
$sql = "DELETE FROM users WHERE id = '$id'";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
