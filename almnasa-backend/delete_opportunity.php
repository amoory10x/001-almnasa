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
if (isset($data["id"])) {
    $id = $data["id"];
    $sql = "DELETE FROM opportunities WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "✅ تم الحذف"]);
    } else {
        echo json_encode(["message" => "❌ فشل في الحذف"]);
    }

    $stmt->close();
} else {
    echo json_encode(["message" => "⚠️ لم يتم إرسال معرف"]);
}
$conn->close();
?>
