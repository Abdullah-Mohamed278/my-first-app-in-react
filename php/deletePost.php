<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facebook";
// Create connection
$conn = new mysqli($servername, $username, $password , $dbname);

$id = $_POST['id'];


$delete = "DELETE FROM `post` WHERE `post`.`id` = '$id'";

mysqli_query ($conn , $delete);

$select = "SELECT * from post ORDER BY id DESC";

 $record = mysqli_query ($conn , $select);
 
 
 while ($row = mysqli_fetch_assoc($record))
 {
     $items[] = $row;
 }
 
 
 echo json_encode($items);