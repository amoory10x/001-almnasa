<?php
// إعدادات CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// الاتصال بقاعدة البيانات
$host = "localhost";
$dbname = "almnasadb";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["message" => "فشل الاتصال بقاعدة البيانات"]));
}

// استقبال البيانات
$data = json_decode(file_get_contents("php://input"), true);

// التحقق الذكي من الحقول
$required = ["title", "organization_name", "available_seats", "description", "status", "org_id"];
foreach ($required as $key) {
    if (!isset($data[$key]) || $data[$key] === "") {
        echo json_encode(["message" => "⚠️ الحقل '$key' مفقود أو فارغ", "data" => $data]);
        exit();
    }
}

// تأمين البيانات
$title = $conn->real_escape_string($data["title"]);
$org_name = $conn->real_escape_string($data["organization_name"]);
$seats = intval($data["available_seats"]);
$desc = $conn->real_escape_string($data["description"]);
$status = $conn->real_escape_string($data["status"]);
$org_id = $conn->real_escape_string($data["org_id"]);

$sql = "INSERT INTO opportunities (title, organization_name, available_seats, description, status, org_id)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["message" => "❌ فشل في تحضير الاستعلام", "error" => $conn->error]);
    exit();
}

$stmt->bind_param("ssisss", $title, $org_name, $seats, $desc, $status, $org_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "✅ تم إضافة الفرصة", "id" => $conn->insert_id]);
} else {
    echo json_encode(["message" => "❌ فشل في تنفيذ الإضافة", "error" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>