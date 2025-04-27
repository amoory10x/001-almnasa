<?php
// ضروري جدًا لحل مشكلة CORS + JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// الرد على طلب preflight مباشرة
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  exit();
}

$host = "localhost";
$dbname = "almnasadb";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["message" => "فشل الاتصال بقاعدة البيانات"]));
}

$data = json_decode(file_get_contents("php://input"), true);
if (
    isset($data["id"]) && isset($data["title"]) &&
    isset($data["organization_name"]) && isset($data["available_seats"]) &&
    isset($data["description"]) && isset($data["status"])
) {
    $id = $data["id"];
    $title = $data["title"];
    $org_name = $data["organization_name"];
    $seats = $data["available_seats"];
    $desc = $data["description"];
    $status = $data["status"];

    $sql = "UPDATE opportunities SET title=?, organization_name=?, available_seats=?, description=?, status=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssissi", $title, $org_name, $seats, $desc, $status, $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "✅ تم تعديل الفرصة"]);
    } else {
        echo json_encode(["message" => "❌ فشل في التعديل"]);
    }

    $stmt->close();
} else {
    echo json_encode(["message" => "⚠️ بيانات ناقصة"]);
}
$conn->close();
?>
