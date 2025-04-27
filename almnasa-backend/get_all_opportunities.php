<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$conn = new mysqli("localhost", "root", "", "almnasadb");
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["message" => "فشل الاتصال"]);
    exit();
}

$sql = "SELECT * FROM opportunities WHERE status = 'مفتوحة'";
$result = $conn->query($sql);

$opportunities = [];
while ($row = $result->fetch_assoc()) {
    $opportunities[] = $row;
}

echo json_encode($opportunities);
$conn->close();
?>
