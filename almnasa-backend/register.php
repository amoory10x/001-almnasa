<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

// الاتصال بقاعدة البيانات
$host = "localhost";
$dbname = "almnasadb";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["message" => "فشل الاتصال بقاعدة البيانات"]));
}

// قراءة البيانات من React
$data = json_decode(file_get_contents("php://input"), true);

// التحقق من وجود البيانات
if (
    isset($data["id"]) && isset($data["name"]) &&
    isset($data["email"]) && isset($data["phone"]) &&
    isset($data["password"]) && isset($data["type"])
) {
    $id = intval($data["id"]); // الرقم التدريبي
    $name = $data["name"];
    $email = $data["email"];
    $phone = $data["phone"];
    // $pass = password_hash($data["password"], PASSWORD_DEFAULT); // تشفير كلمة المرور
    $pass = $data["password"]; // غير مشفرة
    $type = $data["type"];

    $sql = "INSERT INTO users (id, name, email, phone, password, type) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("isssss", $id, $name, $email, $phone, $pass, $type);

    if ($stmt->execute()) {
        echo json_encode(["message" => "✅ تم تسجيل المستخدم بنجاح"]);
    } else {
        echo json_encode(["message" => "❌ خطأ أثناء التسجيل: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["message" => "⚠️ بيانات غير مكتملة أو غير صحيحة"]);
}

$conn->close();
?>
