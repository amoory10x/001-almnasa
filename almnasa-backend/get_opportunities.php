
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

// قراءة org_id من الطلب
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["org_id"])) {
    $org_id = $data["org_id"];

    $sql = "SELECT * FROM opportunities WHERE org_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $org_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $opportunities = [];
    while ($row = $result->fetch_assoc()) {
        $opportunities[] = $row;
    }

    echo json_encode($opportunities);
    $stmt->close();
} else {
    echo json_encode(["message" => "⚠️ org_id غير موجود في الطلب"]);
}

$conn->close();
?>
