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

if (isset($data["id"]) && isset($data["password"])) {
    $id = $data["id"];
    $password = $data["password"];

    // استعلام للتحقق من المستخدم
    $sql = "SELECT * FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);  // نربط رقم المستخدم كـ integer
    $stmt->execute();
    $result = $stmt->get_result();

    // تحقق من وجود المستخدم
    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        // تحقق من تطابق كلمة المرور (بدون تشفير)
        if ($user["password"] === $password) {
            echo json_encode([
                "message" => "✅ تسجيل دخول ناجح",
                "type" => $user["type"],  // نوع المستخدم سيتم استخدامه للتوجيه
                "name" => $user["name"],
                "email" => $user["email"]
            ]);
        } else {
            echo json_encode(["message" => "❌ كلمة المرور غير صحيحة"]);
        }
    } else {
        echo json_encode(["message" => "❌ المستخدم غير موجود"]);
    }

    $stmt->close();
} else {
    echo json_encode(["message" => "⚠️ بيانات غير مكتملة"]);
}

$conn->close();
?>
