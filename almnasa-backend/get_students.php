<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "almnasadb");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "فشل الاتصال"]);
    exit();
}

$sql = "SELECT id, name, email, phone, type FROM users WHERE type = 'student'";
$result = $conn->query($sql);

$students = [];
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

echo json_encode($students);
$conn->close();
?>
