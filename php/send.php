<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facebook";
// Create connection
$conn = new mysqli($servername, $username, $password , $dbname);


$name = $_POST['poster'];
$content = $_POST['content'];
$liked = $_POST['liked'];


$insert = "INSERT INTO `post` ( `poster`, `content`, `liked`) VALUES ( '$name', '$content', '$liked');";

mysqli_query ($conn,$insert);

$select = "SELECT * from post ORDER BY id DESC";

$record = mysqli_query ($conn , $select);

while ($row = mysqli_fetch_assoc($record))
{
    $items[] = $row;
}

echo json_encode($items);