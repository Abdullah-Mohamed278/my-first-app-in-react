<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "facebook";
// Create connection
$conn = new mysqli($servername, $username, $password , $dbname);

$id = $_POST['id'];
$liked = $_POST['liked'];


if($liked == "Liked")
$update = "UPDATE post set liked = 'Like' where id = '$id'";

else
$update = "UPDATE post set liked = 'Liked' where id = '$id'";

 mysqli_query ($conn , $update);


 
 $select = "SELECT * from post ORDER BY id DESC";

 $record = mysqli_query ($conn , $select);
 
 
 while ($row = mysqli_fetch_assoc($record))
 {
     $items[] = $row;
 }
 
 
 echo json_encode($items);