<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$kapcsolat = new PDO(
    "mysql:host=localhost;dbname=Kisprojekt;charset=utf8mb4",
    "root",
    ""
);

$adat = json_decode(file_get_contents("php://input"), true);

$nev = $adat["nev"] ?? "";
$loginnev = $adat["loginnev"] ?? "";
$jelszo = $adat["jelszo"] ?? "";
$szerepkor = $adat["szerepkor"] ?? "";
$auto = $adat["auto"] ?? true;
$pc = $adat["pc"] ?? false;
$mobil = $adat["mobil"] ?? "";
$email = $adat["email"] ?? "";

if (
    $nev == "" ||
    $loginnev == "" ||
    $jelszo == "" ||
    $szerepkor == "" ||
    $mobil == "" ||
    $email == ""
) {
    echo json_encode([
        "siker" => false,
        "uzenet" => "Minden mezőt ki kell tölteni!"
    ]);
    exit;
}

$nevRegex = "/^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű ]+$/";
$loginRegex = "/^[A-Za-z0-9]+$/";
$mobilRegex = "/^[0-9+\/-]+$/";
$emailRegex = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";

if (!preg_match($nevRegex, $nev)) {
    echo json_encode([
        "siker" => false,
        "uzenet" => "A név csak betűket és szóközt tartalmazhat!"
    ]);
    exit;
}

if (!preg_match($loginRegex, $loginnev)) {
    echo json_encode([
        "siker" => false,
        "uzenet" => "A login név csak betűket és számokat tartalmazhat!"
    ]);
    exit;
}

if (strlen($jelszo) < 5 || strlen($jelszo) > 25) {
    echo json_encode([
        "siker" => false,
        "uzenet" => "A jelszó 5 és 25 karakter között legyen!"
    ]);
    exit;
}

if (!preg_match($mobilRegex, $mobil)) {
    echo json_encode([
        "siker" => false,
        "uzenet" => "Hibás mobiltelefonszám!"
    ]);
    exit;
}

if (!preg_match($emailRegex, $email)) {
    echo json_encode([
        "siker" => false,
        "uzenet" => "Hibás e-mail cím!"
    ]);
    exit;
}

$sql = "INSERT INTO regisztracio
        (nev, loginnev, jelszo, szerepkor, auto, pc, mobil, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $kapcsolat->prepare($sql);

$stmt->execute([
    $nev,
    $loginnev,
    $jelszo,
    $szerepkor,
    $auto,
    $pc,
    $mobil,
    $email
]);

echo json_encode([
    "siker" => true,
    "uzenet" => "Sikeres regisztráció!"
]);